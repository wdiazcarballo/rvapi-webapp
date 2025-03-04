import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then( ()=>console.log("Yeahh...MongoDB connected!") )
.catch( (msg)=>console.log(msg) );

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
  });
  const Product = mongoose.model("Product", productSchema);

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Express Response Page</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin: 50px;
                }
                h1 {
                    color: #007bff;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to Express!</h1>
            <p>This page is served using Express.js</p>
        </body>
        </html>
    `);
});

app.get('/products', async (req, res)=>{
   const products = await Product.find();
   res.json(products);
});

app.post('/product', async (req, res)=>{
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

const PORT=process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`));