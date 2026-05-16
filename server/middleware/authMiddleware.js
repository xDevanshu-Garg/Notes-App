const jwt = require("jsonwebtoken");

const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  try {
    // Check authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = protect;

/* 
Request
   ↓
Auth Middleware
   ↓
Route
   ↓
Response
*/

// jwt.verify() Checks: token valid? secret correct? expired?

// From jwt.sign({id}) during token creation, now we're retrieving that payload using decoded.id

/*
During verification of jwt.verify()

Client sends token like = Authorization: Bearer eyJhbGc...

Server does: jwt.verify(token, secret)

Internally:
  Step 1: Take header + payload from token.

  Step 2: Again generate signature using SAME secret.

  Step 3: Compare generated signature with token signature.

If same -> Token is valid.

If attacker modifies payload like id: "123" → id: "999" then signature changes and Verification fails.
*/