const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;

// jwt.sign() = creates token
// 3 params = {id (stores user id)}, process.env.JWT_SECRET, {expiresIn: "30d"}
