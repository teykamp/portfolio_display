exports.CORS_ORIGINS = ["http://localhost:3000"];

// jwt token verification middleware
exports.verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {

  } else {
    res.json({ error: 'Forbidden! Client Access Token Not Valid', status: 403 });
    res.sendStatus(403);
  }
}