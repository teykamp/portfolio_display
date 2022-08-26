const mongoose = require('mongoose');

const AccountSchema = mongoose.Schema({

  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accountCreationDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  userIP: {
    type: String,
    required: false
  }

});

module.exports = mongoose.model('Account', AccountSchema);