const getAllProducts = async (req, res) => {
  res.status(200).send("Got products.");
};

const addProduct = async (req, res) => {
  res.status(200).send("added product!");
};

module.exports = { getAllProducts, addProduct };
