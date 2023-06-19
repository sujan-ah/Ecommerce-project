import mongoose from "mongoose";

const adminRoleSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserRole",
        required: true,
    },
    
})

const AdminRole = mongoose.model("AdminRole", adminRoleSchema)

export default AdminRole