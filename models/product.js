const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be provided"],
  },
  price: {
    type: Number,
    required: [true, "Product price must be provided"],
    min: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be greater than 5"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "Company with name {VALUE} is not suppported",
    },
    // enum: ["ikea", "liddy", "caressa", "marcos"],
  },
});

module.exports = mongoose.model("Product", productSchema);
