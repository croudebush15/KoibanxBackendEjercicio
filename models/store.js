const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Name is required.']},
  cuit: {type: String, required: [true, 'CUIT is required.']},
  concepts: {type: Array, required: [true, 'Concepts are required.']},
  currentBalance: {type: Number, required: [true, 'Current balance is required.']},  
  active: {type: Boolean, required: [true, 'Active status is required.']},
  lastSale: {type: Date, required: [true, 'Date of last sale is required.']},
},{ timestamps: true });

module.exports = mongoose.model('Store', StoreSchema);
