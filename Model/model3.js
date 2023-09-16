const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Set validation rules
  category_id: { type: Number, required: true, unique: true },
  category_name: String,
  category_txt: String,
  category_img: String,
});

module.exports = mongoose.model('Category', categorySchema);
