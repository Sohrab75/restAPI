const mongoose = require('mongoose');
const { options } = require('../Routes/Routes');
const {options1} = require('../Routes/Routes1');
const {options2} = require('../Routes/Routes2');
const {options3} = require('../Routes/Routes3');

 


const connectDb =(uri)=>{
    console.log('connectDb');
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports= connectDb;