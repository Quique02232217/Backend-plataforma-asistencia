const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get("/usuario/:id_usuario/cedula", UsuarioController.obtenerCedula);

module.exports = router;
