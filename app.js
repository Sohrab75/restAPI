require("dotenv").config();
const express = require('express');
const cors=require("cors");
const app = express();
const connectDb = require('./db/connect')
const products_route =require('./Routes/Routes')
const products_review =require('./Routes/Routes1')
const products_feature =require('./Routes/Routes2')
const products_category =require('./Routes/Routes3')

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
app.use("/api/reviews", products_review);
app.use("/api/features", products_feature);
app.use("/api/categories", products_category)

// app.use('/api/products/:featureId', (req, res)=>{
//     let feature_id =Number(req.query.featureId)
//     db.collection('products').find({feature_id}).toArray((err, data)=>{
//         if(err) throw err;
//         res.send(data);
//     })

// })
    
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