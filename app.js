require("dotenv").config();
const express = require('express');
const cors=require("cors");
const app = express();
const connectDb = require('./db/connect')
const products_route =require('./Routes/Routes')
const PORT = process.env.PORT || 8000;



const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));


app.get('/', (req, res) => {
    res.send('Hello World! this is Live from express');
})
//middleware to set to router
app.use("/api/products", products_route);

const start = async()=>{
    try{
        await connectDb(process.env.MONGODB_URL, process);
        app.listen(PORT, ()=>{
           console.log( `${PORT}  yes i am connected`)
        });
        
    }catch(error){
        console.error('Error listening on port')
    };
    
}

start();