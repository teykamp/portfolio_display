const express = require('express');
const router = express.Router();
const Account = require('../models/accounts');

router.get('/', async (req, res) => {

  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/:username', async (req, res) => {

  try {
    const account = await Account.findOne({ username: req.params.username }, '-userIP');
    res.json(account);
  } catch (error) {
    res.json({ message: error });
  };

});

// MAY BE REMOVED LATER
router.get('/:username/ip', async (req, res) => {

  try {
    const ipAddress = await Account.findOne({ username: req.params.username }, 'userIP -_id');
    if (!ipAddress?.userIP) throw 'User Has No IP Address On File';
    res.json(ipAddress?.userIP);
  } catch (error) {
    res.json({ error });
  };

});

router.get('/:username/istaken?', async (req, res) => {

  try {
    /* asks mongo for the first document containing a username property that matches :username
    route param, then asks for only the username of that document to save on the cost of
    the operation. -_id tells mongo to leave out the _id property in object that it returns
    which i include only because mongos default behavior is to throw id in the response to
    any document query. Lastly i tell my api to response with the boolean representation of
    the return value mongo gave to me. Mongo responds with 'null' as in false for no matches
    and true if the query returned a match to one of the documents inside the cluster */
    const account = await Account.findOne({ username: req.params.username }, 'username -_id');
    res.json(!!account);
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/all/:username', async (req, res) => {
  const accounts = await Account.find({ username: req.params.username }, '_id');
  res.json(accounts.map(obj => obj._id));
});

router.post('/', async (req, res) => {

  const createdUser = new Account({
    username: req.body.username,
    password: req.body.password,
    userIP: req.body.userIP
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
    const deletedAccount = await Account.deleteOne({ _id: req.params.id });
    res.json(deletedAccount);
  } catch (error) {
    res.json({ message: error });
  };

});

module.exports = router;
