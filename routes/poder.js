const express = require("express");
const router = express.Router();
const multer = require("multer");
const verificar = require("../middleware/verify-admin");
const poderService = require("../services/poderService");
const verificarToken = require("../middleware/verify-admin");
const fs = require("fs");
const upload = multer({ dest: "temp/" });

router.post(
  "/poder",
  verificarToken,
  upload.single("archivo"),
  async (request, response) => {
    try {
      const archivo = request.file;
      if (!archivo || archivo.mimetype !== "application/pdf") {
        if (archivo?.path) fs.unlinkSync(archivo.path);
        return response
          .status(400)
          .json({ message: "Debes subir un archivo PDF" });
      }
      const buffer = fs.readFileSync(archivo.path);
      const idInsertado = await poderService.guardarPoder(buffer);
      fs.unlinkSync(archivo.path);
      response
        .status(201)
        .json({ message: "PDF guardado en la BD", id: idInsertado });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Error al guardar el poder" });
    }
  }
);

router.get("/poder/:id", verificarToken, async (req, res) => {
  try {
    const id = req.params.id;
    const archivo = await poderService.obtenerPoder(id);

    res.setHeader("Content-Type", "application/pdf");
    res.send(archivo);
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Archivo no encontrado" });
  }
});
module.exports = router;
