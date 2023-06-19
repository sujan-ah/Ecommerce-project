import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    img:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    rating:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
    },
    numberofrating:{
        type: Number
    },
    description:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    instock:{
        type: Number,
        required: true,
    },
    catagory:{
        type: String,
        required: true,
    },
    cupon:{
        type: String,
    },
    discount:{
        type: Number,
    },
    totalsale:{
        type: Number,
    },
    allcupon:{
        type: String,
    },
    alldiscount:{
        type: Number,
    },
    storename:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'storename'
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: true,
}
)

const Product = mongoose.model("Product", productSchema)

export default Product

