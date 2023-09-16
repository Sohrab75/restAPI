const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  action: String, // Example: "add_product", "remove_product", etc.
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to the Product model
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model (admin)
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AdminAction', adminSchema);
