const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        review_id:Number,
        review_name:String,
        review_text:String,
        review_date:String,
        review_img:String,
        rating:Number
})

module.exports = mongoose.model('Review', reviewSchema);