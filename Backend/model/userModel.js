import mongoose from "mongoose";

const userSchema = new mongoose.Schema({ /* vedio: 29 */
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
        required: true,
    },
    isVendor:{          /* class: 60 part-1 */
        type: Boolean,
        default: false,
    },
    isAffiliate:{          /* class: 63 part-1 */
        type: Boolean,
        default: false,
    },
})
const User = mongoose.model("User", userSchema)

export default User
