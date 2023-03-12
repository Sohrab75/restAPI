const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:String,
    prodName:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    cost: Number,
    orderItem:String

})

module.exports = mongoose.model('Order', orderSchema);