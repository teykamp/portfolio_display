const express = require('express');
const router = express.Router();
const offlineAPI = require('../offlineAPI')
const PortfolioItem = require('../models/portfolioItem');

router.get('/', async (req, res) => {

  try {
    const portfolios = await PortfolioItem.find();
    res.json(portfolios);
  } catch (error) {
    res.json({ message: error });
  }

});

router.get('/:username', async (req, res) => {

  try {
    const getPortfolio = await PortfolioItem.findOne({ username: req.params.username }, '-_id portfolioItem');
    res.json(getPortfolio.portfolioItem);
  } catch {
    // sends null if porfolioItem doesn't exist in cluster
    res.json(null); 
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

router.put('/:username', async (req, res) => {

  try {
    const updatedPortfolioItem = await PortfolioItem.updateOne(
      { username: req.params.username }, 
      { $set: { portfolioItem: req.body.portfolioItem } }
    );
    res.json(updatedPortfolioItem);
  } catch (error) {
    res.json({ message: error });
  }

});

router.delete('/:id', async (req, res) => {

  try {
    const deletedPorfolio = await PortfolioItem.deleteOne({ _id: req.params.id });
    res.json(deletedPorfolio);
  } catch (error) {
    res.json({ message: error });
  };

});

router.get('/offline/:username', async (req, res) => {
  res.json(offlineAPI(req.params.username));
});

module.exports = router;