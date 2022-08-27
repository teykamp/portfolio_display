const express = require('express');
const router = express.Router();
require('dotenv').config();
const Account = require('../models/accounts');
const jwt = require('JsonWebToken');
const { compareSync } = require('bcryptjs');

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.JWT_SECRET);
}

router.post('/', async (req, res) => {

  let authToken = '';

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

  const isAuthorized = compareSync(req.body.password, account.password);

  if (isAuthorized) authToken = generateAccessToken(req.body.username);
  
  res.json({
    isAuthorized,
    authToken
  })
  
})

module.exports = router;