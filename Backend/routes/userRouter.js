import express from "express"
import User from "../model/userModel.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils.js"
import VertualCard from "../model/vertualModel.js"
import UserRole from "../model/userRoleModel.js"
import AdminRole from "../model/adminRoleModel.js"

const userRouter = express.Router()                             /* vedio: 30 */
   
userRouter.get('/userlist', async (req,res)=>{                  /* class: 66 part-1 */ 
    let userAll = await User.find({})
    res.send(userAll)
})

userRouter.post('/userlist/:id', async (req,res)=>{             /* class: 66 HW */ 
    // console.log(req.params.id);
    User.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

userRouter.post('/signup', async(req, res) => {                 /* video no: 38 Signup.jsx L-35 */
    // console.log(req.body);
    const newUser = {                           /* [Rules: 1] */
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    }
    let user = new User(newUser)
    user.save()
    // const newUser = new User({               /* [Rules: 2] */
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: bcrypt.hashSync(req.body.password)
    // })
    // const user = await newUser.save()
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    })
})

userRouter.post('/signin',async (req, res) => {                 /* Login.jsx L-37 */
   
    let user = await User.findOne({email: req.body.email})
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isVendor: user.isVendor,                /* class: 60 part-1 */
                isAffiliate: user.isAffiliate,          /* class: 63 part-1 */
                token: generateToken(user)
            })
            return
        }
    }
    res.status(401).send({msg: "Invalid Email or Password"})
})

userRouter.put('/vendor/:id', async(req, res) => {              /* class: 60 part-1 Vendor.jsx L-17 */
    User.findByIdAndUpdate(req.params.id,{isVendor: true},{new: true},function(err,docs){
        if(err){
            console.log(err);
        }else{
            res.send(docs)
        }
    })
})

userRouter.post('/vertualcart/:id', async (req,res)=>{          /* class: 62 */
    let vertualcardInfo = {
        amount: req.body.amount,
        owner: req.body.owner,
    }
    let vertualcard = await new VertualCard(vertualcardInfo)
    vertualcard.save()
    res.send("done")
})
userRouter.post('/vertualcardPayment', async (req,res)=>{       /* class: 62 */
    // console.log(req.body);
    let data = await VertualCard.find({owner: req.body.owner})
    // console.log(data);
    if(data[0].amount < req.body.price){
        console.log("Amount is not Sufficient");
    }else{
        // console.log(data[0].amount - (req.body.price-(req.body.price*2/100)) );
        VertualCard.findByIdAndUpdate(data[0]._id, 
            {amount: data[0].amount-(req.body.price-(req.body.price*2/100))},{new: true},
            function(err,docs){
            if(err){
                console.log(err);
            }else{
                console.log(docs);
            }
        })
    }
})

/* (Paypal) ami try korechi */
userRouter.get('/vertualcartpaypal/:id', async (req,res)=>{     
    // console.log(req.params.id);  
    const order = await VertualCard.find({owner: req.params.id})
    if(order){
        res.send(order)
        // console.log(order)
    }else{
        res.status(404).send({msg: "Order Not Found"})
    }
})

userRouter.put('/vertualcartpaypal/:id/pay', async(req,res)=>{  /* vedio: 49 order.jsx L-72 (Paypal) */
    console.log(req.params.id);
    const order = await VertualCard.find({owner: req.params.id})
    console.log(order);
    res.send(order);
    // if(order){
    //     order.isPaid = true,
    //     order.paidAt = Date.now(),
    //     order.paymentResult = {
    //         id: req.body.id,
    //         update_time: req.body.update_time,
    //         email_address: req.body.email_address,
    //     }
    //     const updateOrder = await order.save()
    //     res.send({msg: "Order Paid", updateOrder})
    // }else{
    //     res.status(404).send({msg: "Order Not Found"})
    // }
})  
/* (Paypal) ami try korechi */

userRouter.put('/affiliate/:id', async(req, res) => {           /* class: 63 part-1 Affiliate.jsx L-19 */
    User.findByIdAndUpdate(req.params.id,{isAffiliate: true},{new: true},function(err,docs){
        if(err){
            console.log(err);
        }else{
            res.send(docs)
        }
    })
})

userRouter.post('/userRole', async (req,res)=>{                 /* class: 67 AdminRollManagement.jsx L-60 */
    // console.log(req.body);
    let userroleInfo = {
        name: req.body.name,
        permissions: req.body.permissions,
    }
    const userRole = await UserRole(userroleInfo)
    userRole.save()
    res.send(userRole)
})

userRouter.get('/userrole', async (req,res)=>{                  /* class: 67 AdminRollManagement.jsx L-68 */
    let data = await UserRole.find({})
    res.send(data)
})

userRouter.post('/role', async (req,res)=>{                     /* class: 67 AdminRollManagement.jsx L-81 */
    // console.log(req.body);
    let roleInfo = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    }
    const role = await AdminRole(roleInfo)
    role.save()
    res.send(role)
})

userRouter.post('/adminsignin', async (req,res)=>{              /* class: 67 AdminSignin.jsx L-24 */
    let user = await AdminRole.find({email: req.body.email})
    console.log(user);
    if(user){
        if(user[0].password == req.body.password){
            res.send(user)
        }else{
            res.send({msg: "Password not match"})
        }
    }else{
        res.send({msg: "User not found"})
    }
})


export default userRouter