const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;

// jwt.sign() = creates token
// 3 params = {id (stores user id)}, process.env.JWT_SECRET, {expiresIn: "30d"}

/* 
Signing contains 3 things: signature = hash(header + payload(id) + secret(in env))

Now token becomes: hash(header + payload + secret) or header.payload.signature
*/