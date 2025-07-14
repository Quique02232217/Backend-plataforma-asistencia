const db = require("../db");
async function getRepresentateCedulaByUsuarioId(idUsuario) {
  const query = `  
        SELECT r.cedula
      FROM usuario u
      JOIN representante_propiedades rp ON u.id_representante_propiedad = rp.id_representante_propiedad
      JOIN representante r ON rp.id_representante = r.id_representante
      WHERE u.id_usuario = ? AND u.ref_tipo_usuario = 'REPR'`;
  const [rows] = await db.execute(query, [idUsuario]);
  return rows.length > 0 ? rows[0].cedula : null;
}
module.exports = {
  getRepresentateCedulaByUsuarioId,
};
