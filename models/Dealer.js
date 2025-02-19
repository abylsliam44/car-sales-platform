const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: String,
  location: String,
  contact: String,
}, { timestamps: true });

const Dealer = mongoose.model('Dealer', dealerSchema);
module.exports = Dealer;
