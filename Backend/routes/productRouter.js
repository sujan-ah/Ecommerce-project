import express from "express";
import Affiliates from "../model/affiliateModel.js";
import Product from "../model/productModel.js";
import Rating from "../model/ratingModel.js";
import Storename from "../model/storeModal.js";
import User from "../model/userModel.js";

const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
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
  };
  let product = new Product(productInfo);
  product.save();
});

productRouter.get("/", async (req, res) => {
  const products = await Product.find({}).populate("rating");
  res.send(products);
});

productRouter.get("/adminProList", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

productRouter.post("/singleProRating", async (req, res) => {
  console.log(req.body);
  let ratingInfo = {
    proId: req.body.proId,
    rating: req.body.rating,
    userId: req.body.userId,
  };
  const rating = new Rating(ratingInfo);
  rating.save();
  let pro = await findOne({ _id: req.body.proId });
  console.log(pro);
});

productRouter.get("/singleProRating/info/:id", async (req, res) => {
  let data = await Rating.find({ proId: req.params.id });
  res.send(data);
});

productRouter.post("/affiliatedata/:id", async (req, res) => {
  console.log(req.params);
});

productRouter.get("/catagory/:cat", async (req, res) => {
  const catagory = await Product.find({ catagory: req.params.cat });
  res.send(catagory);
});

productRouter.post("/affiliatedata", async (req, res) => {
  let user = await User.findById(req.body.userId);
  if (user.isAffiliate) {
    let product = req.body.pro;
    if (product) {
      product.map((item) => {
        console.log((item.price * 10) / 100);
        let affiliateInfo = {
          amount: (item.price * 10) / 100,
          owner: req.body.userId,
        };
        const affiliate = new Affiliates(affiliateInfo);
        affiliate.save();
      });
    } else {
      res.status(404).send({ msg: "Product Not Found" });
    }
  } else {
    ("");
  }
});

productRouter.get("/:slug", async (req, res) => {
  let product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "Product Not Found" });
  }
});

productRouter.get("/affiliat/info/:id", async (req, res) => {
  let data = await Affiliates.find({ owner: req.params.id });
  res.send(data);
  console.log(data);
});

productRouter.post("/storename", async (req, res) => {
  let storenameInfo = {
    name: req.body.name,
    owner: req.body.id,
  };
  const storename = new Storename(storenameInfo);
  storename.save();
});

productRouter.get("/storename/:id", async (req, res) => {
  let data = await Storename.find({ owner: req.params.id });
  res.send(data);
});

productRouter.put("/storename/edit", async (req, res) => {
  let pro = {
    name: req.body.name,
  };
  Storename.findByIdAndUpdate(req.body.id, pro, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Edited : ", docs);
    }
  });
});

productRouter.get("/productlist/:id", async (req, res) => {
  let data = await Product.find({ owner: req.params.id });
  res.send(data);
});

productRouter.post("/productlist/del", async (req, res) => {
  Product.findByIdAndDelete(req.body.id, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
});

productRouter.get("/productlistModal/:id", async (req, res) => {
  let prolist = await Product.findById(req.params.id);
  res.send(prolist);
});

productRouter.put("/productlistModal/edit", async (req, res) => {
  let proInfo = {
    name: req.body.name,
    price: req.body.price,
    discount: req.body.discount,
  };
  Product.findByIdAndUpdate(req.body.id, proInfo, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Updated User : ", docs);
    }
  });
});

export default productRouter;
