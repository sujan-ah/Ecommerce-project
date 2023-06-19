import mongoose from 'mongoose';
const { Schema } = mongoose;

const vertualCardSchema = new Schema({          /* class: 62 */
    amount:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

const VertualCard = mongoose.model('VertualCard', vertualCardSchema);

export default VertualCard