import express from 'express';
import data from './data.js' /* .js must to write */
import discount from './discount.js' /* vedio: 51*/
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js'
import orderRouter from './routes/orderRoutes.js';

const app = express()

dotenv.config()   /* eti .env file hote sob varriable niye cole asbe */
mongoose.connect(process.env.MONGODB_URL).then(()=>{
  console.log("Mongodb connect")    /* MongoDB Connect kora holo */
}).catch((err)=>{
  console.log(err);
})

/* vedio: 31 */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// /* vedio: 31 */

/* vedio: 49 */
app.get('/api/keys/paypal', (req,res)=>{
  res.send(process.env.PAYPAL_CLIENT || "sb")
})
/* vedio: 49 */

app.use('/api/seed', seedRouter) /* vedio: 25 */
app.use('/products', productRouter) /* vedio: 28 */
app.use('/api/users', userRouter) /* vedio: 30 */
app.use('/api/orders', orderRouter) /* vedio: 45 */

app.get('/discount', function (req, res) {
  res.send(discount)
})


let port = process.env.PORT || 8000

app.listen(8000,()=>{
  console.log("port 8000");
})