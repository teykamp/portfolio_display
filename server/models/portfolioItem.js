const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb+srv://nodebackend:portfolio@cluster0.qcf3a.mongodb.net/?retryWrites=true&w=majority')

const PortfolioItem = mongoose.Schema({

  username: String,

  portfolioItem: Object
  // header: Object,

  // timeline: Object,
  // projects: Object,
  // education: Object,
  // experiences: Object,
  // accomplishments: Object,

  // visibility: Boolean,
  
})


module.exports = conn.model('PortfolioItem', PortfolioItem)