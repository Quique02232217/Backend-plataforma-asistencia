const db = require("../db");

async function guardarPoder(buffer) {
  const [result] = await db.query("INSERT INTO poder (poder) VALUES (?)", [
    buffer,
  ]);
  return result.insertId;
}

async function obtenerPoder(id) {
  const [rows] = await db.query("SELECT poder FROM poder where id_poder = ?", [
    id,
  ]);
  if (rows.length === 0) throw new Error("Poder no encontrado");
  return rows[0].poder;
}

module.exports = {
  guardarPoder,
  obtenerPoder,
};
