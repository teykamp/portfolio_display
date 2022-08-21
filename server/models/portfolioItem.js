const mongoose = require('mongoose')

const PortfolioItem = mongoose.Schema({
  username: String,
  portfolioItem: Object,
  privacySettings: Object
})


module.exports = mongoose.model('PortfolioItem', PortfolioItem)