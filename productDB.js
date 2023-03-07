require('dotenv').config();
const connectDB = require('./db/connect');
const product = require('./Model/model');
const review = require('./Model/model1');
const feature = require('./Model/model2');
const category = require('./Model/model3');
const productJSon = require('./products.json');
const reviewJson = require('./reviews.json');
const featureJson = require('./features.json');
const categoryJSON = require('./categories.json');

const start = async (req, res) => {
    try{
        await connectDB(process.env.MONGODB_URL);
        // await product.deleteMany();
        await product.create(productJSon);
        await review.create(reviewJson);
        await feature.create(featureJson);
        await category.create(categoryJSON);
        console.log('created product');
    } catch(error){
        console.log(error);
    }
};

start();