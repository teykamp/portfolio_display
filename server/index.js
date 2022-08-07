const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const portfolios = require('./api/portfolios');
const auth = require('./api/auth');
const account = require('./api/accounts');
app.use('/api/portfolios', portfolios);
app.use('/api/auth', auth);
app.use('/api/accounts', account);

const PORT = process.env.PORT || 1010;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/public/'));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});