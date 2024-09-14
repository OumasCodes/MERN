const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb+srv://dev1:dev1dev1@cluster0.38dez.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

const createProduct = async (req, res, next) => {
  const newProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });
  const result = await newProduct.save();
  res.send(result);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.send(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
