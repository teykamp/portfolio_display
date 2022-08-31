const jwt = require("jsonwebtoken");

exports.CORS_ORIGINS = ["http://localhost:3000"];

// jwt token verification middleware
exports.verifyToken = (req, res, next) => {
  req.token = req.headers['authorization'] || undefined;
  next()
}

exports.authorizeTokenForUse = (token, username = false) => {
  // snuffs out undefined tokens and returns appropriate response
  if (typeof token === 'undefined') return {
    error: 'Access Denied! Bearer Token Not Present In Request',
    status: 403,
    isAuthorized: false
  }

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