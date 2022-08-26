const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const Account = require('../models/accounts');
const { compareSync } = require('bcryptjs')

router.post('/', async (req, res) => {

  const authToken = '';

  console.log(authToken)

  const user = {
    username: req.body.username
  }

  let account;
  try {
    account = await Account.findOne({ username: req.body.username }, 'password -_id');
  } catch {
    return res.json({ error: 'Database fetch came back unsuccessful.' })
  }

  if (account === null) {
    // username not in database
    return res.json({ isAuthorized: false, authToken })
  }
  // compareSync(req.body.password, account.password);
  const isAuthorized = true

  if (isAuthorized) {
    try {
      jwt.sign({ user }, process.env.JWT_SECRET_KEY, { expiresIn: '10s' }, (err, token) => {
        if (err) console.log(err)
        authToken = token
        console.log('diff')
      })
    } catch (error) {
      console.log('sometihn')
      res.json({ error });
    }
  }

  res.json({
    isAuthorized,
    authToken
  })
  
})

module.exports = router;