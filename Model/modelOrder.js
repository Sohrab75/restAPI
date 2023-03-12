const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id:Number,
    prodName:String,
    name:String,
    email:String,
    cost: Number,
    phone:String,
    address:String,    
    orderItem:String

})

module.exports = mongoose.model('Order', orderSchema);