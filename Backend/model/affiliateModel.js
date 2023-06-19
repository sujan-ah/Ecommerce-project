import mongoose from "mongoose";

const affiliateSchema = new mongoose.Schema({               /* class: 64 */
    amount: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
})

const Affiliates = mongoose.model("Affiliate", affiliateSchema)

export default Affiliates