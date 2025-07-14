const jwt = require("jsonwebtoken");
const SECRET_KEY = "secreto_super_seguro";

function verificarToken(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return response.status(401).json({ message: "No authorizado" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    request.user = decoded;
    next();
  } catch (err) {
    return response.status(403).json({ message: "Token invalido o expirado" });
  }
}

module.exports = verificarToken;
