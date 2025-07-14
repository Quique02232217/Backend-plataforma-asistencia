const User = require("../models/User");
async function obtenerCedulaSiEsRepresentante(id_usuario) {
  const cedula = await User.getRepresentateCedulaByUsuarioId(id_usuario);
  return cedula;
}

module.exports = { obtenerCedulaSiEsRepresentante };
