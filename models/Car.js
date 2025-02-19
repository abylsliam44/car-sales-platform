const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
  price: Number,
  dealerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
