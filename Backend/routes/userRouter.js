import express from "express";
import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils.js";
import VertualCard from "../model/vertualModel.js";
import UserRole from "../model/userRoleModel.js";
import AdminRole from "../model/adminRoleModel.js";

const userRouter = express.Router();

userRouter.get("/userlist", async (req, res) => {
  let userAll = await User.find({});
  res.send(userAll);
});

userRouter.post("/userlist/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
});

userRouter.post("/signup", async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  };
  let user = new User(newUser);
  user.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

userRouter.post("/signin", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVendor: user.isVendor,
        isAffiliate: user.isAffiliate,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ msg: "Invalid Email or Password" });
});

userRouter.put("/vendor/:id", async (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { isVendor: true },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    }
  );
});

userRouter.post("/vertualcart/:id", async (req, res) => {
  let vertualcardInfo = {
    amount: req.body.amount,
    owner: req.body.owner,
  };
  let vertualcard = await new VertualCard(vertualcardInfo);
  vertualcard.save();
  res.send("done");
});
userRouter.post("/vertualcardPayment", async (req, res) => {
  let data = await VertualCard.find({ owner: req.body.owner });
  if (data[0].amount < req.body.price) {
    console.log("Amount is not Sufficient");
  } else {
    VertualCard.findByIdAndUpdate(
      data[0]._id,
      {
        amount: data[0].amount - (req.body.price - (req.body.price * 2) / 100),
      },
      { new: true },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log(docs);
        }
      }
    );
  }
});

userRouter.get("/vertualcartpaypal/:id", async (req, res) => {
  const order = await VertualCard.find({ owner: req.params.id });
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ msg: "Order Not Found" });
  }
});

userRouter.put("/vertualcartpaypal/:id/pay", async (req, res) => {
  console.log(req.params.id);
  const order = await VertualCard.find({ owner: req.params.id });
  console.log(order);
  res.send(order);
});

userRouter.put("/affiliate/:id", async (req, res) => {
  /* class: 63 part-1 Affiliate.jsx L-19 */
  User.findByIdAndUpdate(
    req.params.id,
    { isAffiliate: true },
    { new: true },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    }
  );
});

userRouter.post("/userRole", async (req, res) => {
  let userroleInfo = {
    name: req.body.name,
    permissions: req.body.permissions,
  };
  const userRole = await UserRole(userroleInfo);
  userRole.save();
  res.send(userRole);
});

userRouter.get("/userrole", async (req, res) => {
  let data = await UserRole.find({});
  res.send(data);
});

userRouter.post("/role", async (req, res) => {
  let roleInfo = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  const role = await AdminRole(roleInfo);
  role.save();
  res.send(role);
});

userRouter.post("/adminsignin", async (req, res) => {
  let user = await AdminRole.find({ email: req.body.email });
  console.log(user);
  if (user) {
    if (user[0].password == req.body.password) {
      res.send(user);
    } else {
      res.send({ msg: "Password not match" });
    }
  } else {
    res.send({ msg: "User not found" });
  }
});

export default userRouter;
