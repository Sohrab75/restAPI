const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
        feature_id:Number,
        feature_heading:String,
        feature_txt:String,
        feature_image:String
})

module.exports = mongoose.model('Feature',featureSchema);