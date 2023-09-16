const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    id:{type: 'string', required: true, unique: true},
    name:String,
    category_id:{type:String, required: true},
    type:String,
    cost:Number,
    quantity:String,
    location:String,
    image:String
})

module.exports = mongoose.model('Product',productSchema);