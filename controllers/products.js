const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "din";
  const products = await Product.find({ price: { $gte: 50, $lte: 125 } })
    .sort("price name")
    .select("name price");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};

  if (featured == "true" || featured == "false") {
    queryObject.featured = featured == "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("-createdAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

const addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ product });
};

module.exports = { getAllProductsStatic, getAllProducts, addProduct };
