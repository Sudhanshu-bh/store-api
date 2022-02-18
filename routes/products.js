const express = require("express");
const router = express.Router();

const {
  getAllProductsStatic,
  getAllProducts,
  addProduct,
} = require("../controllers/products");

router.route("/static").get(getAllProductsStatic);
router.route("/").get(getAllProducts).post(addProduct);

module.exports = router;
