const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');

router.get('/', async (req, res) => {

  try {
    const accounts = await Account.find();
    res.json(accounts)
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/:username', async (req, res) => {

  try {
    const account = await Account.findOne({ username: req.params.username });
    res.json(account);
  } catch (error) {
    res.json({ message: error });
  };

});

router.post('/', async (req, res) => {

  const createdUser = new Account({
    username: req.body.username,
    password: req.body.password
  });

  try {
    const postUser = await createdUser.save();
    res.json(postUser);
  } catch (error) {
    res.json({ message: error });
  };

});

router.delete('/:id', async (req, res) => {

  try {
    const deletedUser = await UserBase.deleteOne({ _id: req.params.id });
    res.json(deletedUser);
  } catch (error) {
    res.json({ message: error });
  };

});

module.exports = router;
