require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const asistenciaRoutes = require("./routes/asistencia");
const authRoutes = require("./routes/auth");
const poderRoutes = require("./routes/poder");
const usuarioRoutes = require("./routes/usuario.routes");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", poderRoutes);
app.use("/api", authRoutes);
app.use("/api", asistenciaRoutes);

app.use("/api", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
