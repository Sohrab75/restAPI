require('dotenv').config();
const connectDB = require('./db/connect');
const product = require('./Model/model');
const productJSon = require('./products.json')

const start = async (req, res) => {
    try{
        await connectDB(process.env.MONGODB_URL);
        // await product.deleteMany();
        await product.create(productJSon);
        console.log('created product');
    } catch(error){
        console.log(error);
    }
};

start();