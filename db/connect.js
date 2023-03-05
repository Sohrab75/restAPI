const mongoose = require('mongoose');
const { options } = require('../Routes/Routes');

 


const connectDb =(uri)=>{
    console.log('connectDb');
    return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

module.exports= connectDb;