const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/:user', async (req, res) => {

  const user = {
    username: req.params.user
  }

  try {
    jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '10s' }, (err, token) => {
      if (err) console.log(err)
      res.json({ token });
    })
  } catch (error) {
    res.json({ error });
  }
})

module.exports = router;