const express = require("express");
const router = express.Router();

const { getAllProducts, addProduct } = require("../controllers/products");

router.route("/").get(getAllProducts).post(addProduct);

module.exports = router;
