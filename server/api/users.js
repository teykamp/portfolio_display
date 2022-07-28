const express = require('express');
const offlineAPI = require('../offlineAPI')
const router = express.Router();
const PortfolioItem = require('../models/portfolioItem');

router.get('/', async (req, res) => {

  try {
    const portfolios = await PortfolioItem.find();
    res.json(portfolios)
  } catch (error) {
    res.json({ message: error });
  }

});

router.get('/:username', async (req, res) => {

  try {
    const getPortfolio = await PortfolioItem.findOne({ username: req.params.username });
    res.json(getPortfolio);
  } catch (error) {
    res.json({ message: error });
  };

});

router.post('/', async (req, res) => {

  const portfolioItem = new PortfolioItem({
    username: req.body.username,
    portfolioItem: req.body.portfolioItem
  });

  try {
    const portfolioConfirmation = await portfolioItem.save();
    res.json(portfolioConfirmation);
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/offline/:username', async (req, res) => {

  try {
    res.json(offlineAPI(req.params.username));
  } catch (error) {
    res.json({ message: error });
  };

})

module.exports = router;