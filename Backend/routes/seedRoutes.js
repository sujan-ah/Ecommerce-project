import express from "express"
import Product from "../model/productModel.js"
import User from "../model/userModel.js"
import userData from "../userData.js"
import data from "../data.js"


const seedRouter = express.Router() /* vedio: 25 */

// seedRouter.get('/', async (req,res)=>{
//     await Product.remove({})
//     const product = await Product.insertMany(data)

//     /* vedio: 29 */
//     await User.remove({})
//     const user = await User.insertMany(userData)
//     /* vedio: 29 */
    
//     res.send(product)
// })


export default seedRouter

