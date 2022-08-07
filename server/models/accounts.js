const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb+srv://math-race-users:userData@math-race-users.awkeu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

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
  }

});

module.exports = conn.model('Account', AccountSchema);