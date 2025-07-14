const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "secreto_super_seguro";

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}

module.exports = {
  generateToken,
  verifyToken,
};
