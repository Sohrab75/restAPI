const AdminAction = require('../Model/admin');
const Product = require('../Model/model');

exports.addProduct = async (req, res) => {
  try {
    const { productName, description } = req.body;
    const product = await Product.create({ productName, description });
    await AdminAction.create({
      action: 'add_product',
      product: product._id,
      admin: req.user._id // Assuming req.user holds the authenticated admin's details
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product' });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    await Product.findByIdAndRemove(productId);
    await AdminAction.create({
      action: 'remove_product',
      product: productId,
      admin: req.user._id // Assuming req.user holds the authenticated admin's details
    });
    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product' });
  }
};
