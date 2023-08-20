require("dotenv").config();
const express = require('express');
const cors = require("cors");
const app = express();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectDb = require('./db/connect');
const products_route = require('./Routes/Routes');
const products_review = require('./Routes/Routes1');
const products_feature = require('./Routes/Routes2');
const products_category = require('./Routes/Routes3');
const orderRoute = require('./Routes/RoutesOrder');
const userRoutes = require('./Routes/userRoutes');
const bcryptjs = require("bcryptjs");
const saltRounds =10;


const PORT = process.env.PORT || 8000;

const corsOptions = {
   origin: '*',
   credentials: true,
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions));
app.use(express.json()); // Use express.json() to parse JSON in the request body

app.get('/', (req, res) => {
    res.send('Hello World! This is Live from express');
});

app.post('/api/PlaceOrder', async (req, res) => {
    const order = req.body;
    console.log(order);
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db('test');
        const result = await db.collection('orders').insertOne(order);
        client.close();
        res.status(200).json(result);
        console.log(db);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error connecting to database");
    }
});

app.use("/api/products", products_route);
app.use("/api/reviews", products_review);
app.use("/api/features", products_feature);
app.use("/api/categories", products_category);
app.use('/api/orders', orderRoute);
app.use('/api/users', userRoutes);

const start = async () => {
    try {
        await connectDb(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT}  yes I am connected`);
        });
    } catch (error) {
        console.error('Error listening on port');
    }
}

module.exports.bcryptjs = bcryptjs;

start();
