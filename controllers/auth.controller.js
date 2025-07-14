const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const {
  findUserByCedula,
  createUser,
  isAdminUser,
} = require("../services/auth.service");

async function register(req, res) {
  const { cedula, password, primer_nombre, primer_apellido } = req.body;

  try {
    const exists = await findUserByCedula(cedula);
    if (exists) {
      return res.status(400).json({ message: "Cédula ya registrada" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await createUser({ cedula, hashed, primer_nombre, primer_apellido });

    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error al registrar:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

async function login(req, res) {
  const { cedula, password } = req.body;

  try {
    const representante = await findUserByCedula(cedula);
    if (!representante) {
      return res.status(401).json({ message: "Cédula incorrecta" });
    }

    const isValid = await bcrypt.compare(password, representante.password);
    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const esAdmin = await isAdminUser(representante.id_representante);
    if (!esAdmin) {
      return res
        .status(403)
        .json({ message: "Acceso no autorizado: no eres ADMIN" });
    }

    const token = jwt.generateToken({
      id: representante.id_representante,
      nombre: representante.primer_nombre,
      cedula: representante.cedula,
    });

    return res.json({
      message: "Login exitoso",
      token,
      nombre: `${representante.primer_nombre} ${representante.primer_apellido}`,
      id: representante.id_representante,
      tipo: "ADMIN",
    });
  } catch (err) {
    console.error("Error en login:", err);
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = { register, login };
