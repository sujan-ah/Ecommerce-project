import express from 'express'
import Affiliates from '../model/affiliateModel.js'
import Product from '../model/productModel.js'
import Rating from '../model/ratingModel.js'
import Storename from '../model/storeModal.js'
import User from '../model/userModel.js'

const productRouter = express.Router()

productRouter.post('/', async (req,res)=>{                           /* class: 61 part-2 Dashboard.jsx L-68*/
    let productInfo = {
        name: req.body.name,
        img: req.body.image,
        price: req.body.price,
        description: req.body.description,
        slug: req.body.slug,
        instock: req.body.stock,
        catagory: req.body.catagory,
        cupon: req.body.cupon,
        discount: req.body.discount,
        total: req.body.total,
        owner: req.body.owner,
    }
    let product = new Product(productInfo)
    product.save()
})

productRouter.get('/', async(req,res)=>{                             /* ProRating HW class: 64 */
    const products = await Product.find({}).populate("rating")
    // console.log(products);
    res.send(products)
})

productRouter.get('/adminProList', async(req,res)=>{                             /* class: 66 HW AdminProductList.jsx L-12*/
    const products = await Product.find({})
    res.send(products)
})
 
productRouter.post('/singleProRating', async (req,res)=>{            /* ProRating HW class: 64 */
    console.log(req.body);
    let ratingInfo = {
        proId: req.body.proId,
        rating: req.body.rating,
        userId: req.body.userId,
    }
    const rating = new Rating(ratingInfo)
    rating.save()
    let pro = await findOne({_id: req.body.proId})
    console.log(pro);
   
 
    
})

productRouter.get('/singleProRating/info/:id', async (req,res)=>{    /* ProRating HW class: 64 */
    let data = await Rating.find({proId: req.params.id})
    res.send(data);
})

productRouter.post('/affiliatedata/:id', async (req,res)=>{

    console.log(req.params);
    // console.log(req.query);
    // let user = await User.findById(req.params.id)
    // console.log(user);
    // if(user.isAffiliate){
    //     let product = await Product.findOne({slug: req.params.slug})
    //     console.log(product);
    // }

    // if(req.query.id){
    //     let user = await User.findById(req.query.id)
    //     if(user.isAffiliate){
    //         let product = await Product.findOne({slug: req.params.slug})
    //         // console.log((product.price*10)/100);
    //         if(product){
    //             let affiliateInfo = {
    //                 amount: (product.price*10)/100,
    //                 owner: req.query.id
    //             }
                
    //             const affiliate = new Affiliates(affiliateInfo)
    //             affiliate.save()
    //             res.send(product)
    //         }else{
    //             res.status(404).send({msg: 'Product Not Found'})
    //         }

    //     }else{
    //         let product = await Product.findOne({slug: req.params.slug})
    //         if(product){
    //             res.send(product)
    //         }else{
    //             res.status(404).send({msg: 'Product Not Found'})
    //         }
    //     }
    // }else{
    //     let product = await Product.findOne({slug: req.params.slug})
    //     if(product){
    //         res.send(product)
    //     }else{
    //         res.status(404).send({msg: 'Product Not Found'})
    //     }
    // }
})

productRouter.get('/catagory/:cat', async (req, res) => {            /* HomePage.jsx L-41 */
    // console.log(req.params.cat);
    const catagory = await Product.find({catagory: req.params.cat})
    // console.log(catagory);
    res.send(catagory)
})

productRouter.post('/affiliatedata',async(req,res)=>{    /* AffiliateInfo HW */
    // console.log(req.body.userId);
    // console.log(req.body.pro);
    let user = await User.findById(req.body.userId)
    if(user.isAffiliate){
        let product = (req.body.pro)
        if(product){
            product.map((item)=>{
                console.log((item.price*10)/100);
                let affiliateInfo = {
                    amount: (item.price*10)/100,
                    owner: req.body.userId
                }
                const affiliate = new Affiliates(affiliateInfo)
                affiliate.save()
            })
        }else{
            res.status(404).send({msg: 'Product Not Found'})
        }
    }else{
        ""
    }
})

productRouter.get('/:slug', async (req,res) => {                    /* vedio: 28 ProductDtails.jsx L-59 */
    let product = await Product.findOne({slug: req.params.slug})
    if(product){
        res.send(product)
    }else{
        res.status(404).send({msg: 'Product Not Found'})
    }
    /* class: 64 */
    // if(req.query.id){
    //     let user = await User.findById(req.query.id)
    //     if(user.isAffiliate){
    //         let product = await Product.findOne({slug: req.params.slug})
    //         // console.log((product.price*10)/100);
    //         if(product){
    //             let affiliateInfo = {
    //                 amount: (product.price*10)/100,
    //                 owner: req.query.id
    //             }
                
    //             const affiliate = new Affiliates(affiliateInfo)
    //             affiliate.save()
    //             res.send(product)
    //         }else{
    //             res.status(404).send({msg: 'Product Not Found'})
    //         }

    //     }else{
    //         let product = await Product.findOne({slug: req.params.slug})
    //         if(product){
    //             res.send(product)
    //         }else{
    //             res.status(404).send({msg: 'Product Not Found'})
    //         }
    //     }
    // }else{
    //     let product = await Product.findOne({slug: req.params.slug})
    //     if(product){
    //         res.send(product)
    //     }else{
    //         res.status(404).send({msg: 'Product Not Found'})
    //     }
    // }
    /* class: 64 */
})

productRouter.get('/affiliat/info/:id', async (req,res)=>{           /* class: 64 */
    let data = await Affiliates.find({owner: req.params.id})
    res.send(data)
    console.log(data)
})

productRouter.post('/storename', async (req, res) => {               /* class: 60 part-2 Storename.jsx L-22 */
    let storenameInfo = {
        name: req.body.name,
        owner: req.body.id,
    }
    const storename = new Storename(storenameInfo)
    storename.save()
    // console.log("cate created");
    // console.log(storename);
})

productRouter.get('/storename/:id', async (req, res) => {            /* class: 60 part-2 Storename.jsx L-40 */
    let data = await Storename.find({owner: req.params.id})
    res.send(data)
    // console.log(data)
})

productRouter.put('/storename/edit', async (req,res)=>{              /* Storename.jsx L-32 */
    let pro = {
        name: req.body.name,
    }
    Storename.findByIdAndUpdate(req.body.id, pro,function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Edited : ", docs);
        }
    });
})

productRouter.get('/productlist/:id', async (req, res)=>{            /* vedio: 60 Dashboard.jsx L- */  
    let data = await Product.find({owner: req.params.id})
    res.send(data)
})

productRouter.post('/productlist/del', async (req,res)=>{            /* HW video: 62 */
    Product.findByIdAndDelete(req.body.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
})

productRouter.get('/productlistModal/:id', async (req,res)=>{
    let prolist = await Product.findById(req.params.id)
    res.send(prolist);
})

productRouter.put('/productlistModal/edit', async (req,res)=>{
    let proInfo = {
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
    }
    Product.findByIdAndUpdate(req.body.id,  proInfo , function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Updated User : ", docs);
        }
    });
})

export default productRouter