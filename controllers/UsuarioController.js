const UserService = require("../services/UserService");

async function obtenerCedula(req, res) {
  try {
    const { id_usuario } = req.params;
    const cedula = await UserService.obtenerCedulaSiEsRepresentante(id_usuario);
    if (!validarCedula) return;
    res.json({ cedula });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
}

function validarCedula(cedula, res) {
  if (!cedula) {
    return res
      .status(403)
      .json({ message: "No autorizado o no es representante" });
  }
}

module.exports = {
  obtenerCedula,
};
