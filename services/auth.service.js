const db = require("../db");

async function findUserByCedula(cedula) {
  const [rows] = await db.query(
    "SELECT * FROM representante WHERE cedula = ?",
    [cedula]
  );
  return rows[0] || null;
}

async function createUser({ cedula, hashed, primer_nombre, primer_apellido }) {
  return db.query(
    "INSERT INTO representante (cedula, password, primer_nombre, primer_apellido) VALUES (?, ?, ?, ?)",
    [cedula, hashed, primer_nombre, primer_apellido]
  );
}

async function isAdminUser(id_representante) {
  const [rows] = await db.query(
    `SELECT u.ref_tipo_usuario 
     FROM usuario u
     JOIN representante_propiedades rp ON u.id_representante_propiedad = rp.id_representante_propiedad
     WHERE rp.id_representante = ? AND u.ref_tipo_usuario = 'ADMIN'`,
    [id_representante]
  );
  return rows.length > 0;
}

module.exports = {
  findUserByCedula,
  createUser,
  isAdminUser,
};
