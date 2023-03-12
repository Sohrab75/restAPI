const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:{type: 'string', required: true},
    prodName:String,
    name:String,
    email:String,
    phone:Number,
    address:String,
    cost: Number,
    orderItem:String

})

module.exports = mongoose.model('Order', orderSchema);