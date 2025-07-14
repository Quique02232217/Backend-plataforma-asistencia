const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/verify-admin");
const AsistenciaService = require("../services/AsistenciaService");

router.get("/asistencia", verificarToken, async (req, res) => {
  try {
    const data = await AsistenciaService.obtenerAsistencia();
    res.json(data);
  } catch (error) {
    console.error("Error al obtener asistencia:", error);
    res.status(500).json({ message: "Error al obtener datos de asistencia" });
  }
});

module.exports = router;
