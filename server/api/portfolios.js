const express = require('express');
const router = express.Router();
const offlineAPI = require('../offlineAPI')
const PortfolioItem = require('../models/portfolioItem');
const { verifyToken, authorizeTokenForUse } = require('../config')

router.get('/', verifyToken, async (req, res) => {

  try {
    const authorizeToken = authorizeTokenForUse(req.token);
    if (authorizeToken.isAuthorized) {
      const portfolios = await PortfolioItem.find();
      res.json(portfolios);
    } else throw authorizeToken;
  } catch (error) {
    res.json(error);
  }

});

router.get('/:username/content', async (req, res) => {

  try {
    const getPortfolio = await PortfolioItem.findOne({ username: req.params.username }, '-_id portfolioItem');
    res.json(getPortfolio.portfolioItem);
  } catch {
    // sends null if portfolioItem doesn't exist in cluster
    res.json(null);
  };

});

router.get('/:username/privacy', async (req, res) => {

  try {
    const getPortfolio = await PortfolioItem.findOne({ username: req.params.username }, '-_id privacySettings');
    res.json(getPortfolio.privacySettings);
  } catch {
    // sends null if privacySettings don't exist in cluster
    res.json(null);
  };

});

router.post('/', async (req, res) => {

  const portfolioItem = new PortfolioItem({
    username: req.body.username,
    portfolioItem: req.body.portfolioItem,
    privacySettings: req.body.privacySettings
  });

  try {
    const portfolioConfirmation = await portfolioItem.save();
    res.json(portfolioConfirmation);
  } catch (error) {
    res.json({ error });
  };

});

// updates portfolio content
router.put('/:username', verifyToken, async (req, res) => {

  try {
    const authorizeToken = authorizeTokenForUse(req.token, req.params.username);
    if (authorizeToken.isAuthorized) {
      const updatedPortfolioItem = await PortfolioItem.updateOne(
        { username: req.params.username },
        { $set: { portfolioItem: req.body.portfolioItem } }
      );
      res.json(updatedPortfolioItem);
    } else throw authorizeToken;
  } catch (error) {
    res.json(error);
  }

});

// updates privacy settings
router.put('/:username/privacy', verifyToken, async (req, res) => {

  try {
    const authorizeToken = authorizeTokenForUse(req.token, req.params.username);
    if (authorizeToken.isAuthorized) {
      const updatedPrivacySettings = await PortfolioItem.updateOne(
        { username: req.params.username },
        { $set: { privacySettings: req.body.privacySettings } }
      );
      res.json(updatedPrivacySettings);
    } else throw authorizeToken;
  } catch (error) {
    res.json(error);
  }

});

router.delete('/:id', verifyToken, async (req, res) => {

  try {
    const authorizeToken = authorizeTokenForUse(req.token);
    if (authorizeToken.isAuthorized) {
      const deletedPorfolio = await PortfolioItem.deleteOne({ _id: req.params.id });
      res.json(deletedPorfolio);
    } else throw authorizeToken;
  } catch (error) {
    res.json(error);
  }

});

router.get('/offline/:username', async (req, res) => {
  res.json(offlineAPI(req.params.username));
});

module.exports = router;