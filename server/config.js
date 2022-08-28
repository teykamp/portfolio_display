const jwt = require("jsonwebtoken");

exports.CORS_ORIGINS = ["http://localhost:3000"];

// jwt token verification middleware
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    throw res.json({ 
      error: 'Access Denied! Request Does Not Contain Bearer Token', 
      status: 403,
      isAuthorized: false
    })
  }
}

exports.authorizeTokenForUse = (token, username = false) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, tokenData) => {
    switch (true) {
      case !!err:
        return {
          error: 'Access Denied! Bearer Token Invalid',
          status: 403,
          isAuthorized: false
        };
      case tokenData.username !== username && typeof username !== "boolean": 
        return {
          error: 'Access Denied! Username Defined On Token Payload Does Not Match That of The Request Issuer',
          status: 403,
          isAuthorized: false
        };
      default:
        return {
          success: 'Token Use Successfully Authorized. Request May Proceed!',
          isAuthorized: true
        };
    }
  })
}