import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  permissions: [{ type: String }],
});

const UserRole = mongoose.model("UserRole", userRoleSchema);

export default UserRole;
