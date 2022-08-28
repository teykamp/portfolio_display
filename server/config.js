// const jwt = require("jsonwebtoken");
// require('dotenv').config();

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
      status: 403
    })
  }
}

// exports.verifyTokenHolder = (username, token) => {
//   jwt.verify(token, process.env.JWT_SECRET, (err, authData,) => {
//     console.log(authData, username)
//     if (err) {
//       throw res.json({ 
//         error: 'Forbidden! Client Access Token Not Valid', 
//         status: 403
//       })
//     }
//   })
// }