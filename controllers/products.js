const Product = require("../models/Product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ company: "marcos" });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company } = req.query;
  const queryObject = {};

  if (featured == "true" || featured == "false") {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

module.exports = { getAllProductsStatic, getAllProducts, addProduct };
