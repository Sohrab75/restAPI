require("dotenv").config();
const express = require('express');
const cors=require("cors");
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const bodyParser = require('body-parser');
const connectDb = require('./db/connect')
const products_route =require('./Routes/Routes')
const products_review =require('./Routes/Routes1')
const products_feature =require('./Routes/Routes2')
const products_category =require('./Routes/Routes3')
const orderRoute = require('./Routes/RoutesOrder')
const PORT = process.env.PORT || 8000;
let db;


const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.send('Hello World! this is Live from express');
})

//order




//place order
//place order
app.post('/api/PlaceOrder', async (req, res) => {
    const order = req.body;
    console.log(order)
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL)
        const db = client.db('test');
        const result = await db.collection('orders').insertOne(order)
        client.close();
        res.status(200).json(result)
        console.log(db);
       
    }
    catch(error){
        console.log(error)
        res.status(500).send("Error connecting to database");
    }
});


//middleware to set to router
app.use(express.json());

app.use("/api/products", products_route);
app.use("/api/reviews", products_review);
app.use("/api/features", products_feature);
app.use("/api/categories", products_category)
app.use('/api/orders', orderRoute )

const start = async()=>{
    try{
        await connectDb(process.env.MONGODB_URL);
        app.listen(PORT, ()=>{
           console.log( `${PORT}  yes i am connected`)
        });
        
    }catch(error){
        console.error('Error listening on port')
    };
    
}

start();