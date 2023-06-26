import express from "express";
import Product from "../model/productModel.js";
import User from "../model/userModel.js";
import userData from "../userData.js";
import data from "../data.js";

const seedRouter = express.Router();
// seedRouter.get('/', async (req,res)=>{
//     await Product.remove({})
//     const product = await Product.insertMany(data)

//     await User.remove({})
//     const user = await User.insertMany(userData)

//     res.send(product)
// })

export default seedRouter;
