const db = require("../db");

async function obtenerAsistencia() {
  const [rows] = await db.query(`SELECT
      rp.id_representante_propiedad,
      p.nombre_propiedad,
      r.primer_nombre,
      r.primer_apellido,
      r.asistencia,
      pod.id_poder 
    FROM representante_propiedades rp
    INNER JOIN propiedades p ON rp.id_propiedad = p.id_propiedad
    INNER JOIN representante r ON rp.id_representante = r.id_representante
	JOIN poder pod ON pod.id_poder = rp.id_poder`);
  return rows;
}

module.exports = {
  obtenerAsistencia,
};
