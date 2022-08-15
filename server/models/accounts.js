const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb+srv://nodebackend:portfolio@cluster0.qcf3a.mongodb.net/?retryWrites=true&w=majority');

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

module.exports = conn.model('Account', AccountSchema);