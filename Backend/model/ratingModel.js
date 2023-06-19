import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({    /* HW class: 63 */
   
    // proId: {
    //     // type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Product'
    // },
    rating: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const Rating = mongoose.model("Rating", ratingSchema)

export default Rating