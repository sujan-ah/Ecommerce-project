import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({     /* class: 60 part-2 */
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const Storename = mongoose.model('Storename', storeSchema)

export default Storename