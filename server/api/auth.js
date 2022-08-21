const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/:user', async (req, res) => {
  const timeIssued = Date.now();
  try {
    jwt.sign(req.params.user, 'secretkey', (err, token) => {
      if (err) throw err;
      res.json({ token, timeIssued, user: req.params.user, numOfInteractions: 0 });
    })
  } catch (error) {
    res.json({ message: error });
  }
})

module.exports = router;