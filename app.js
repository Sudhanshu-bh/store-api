require("dotenv").config();
// async errors

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

app.get("/", (req, res) =>
  res.send("<h1>Store API</h1> <a href='/api/v1/products'>Products</a>")
);

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (err) {
    console.log("Error: ", err);
  }
};

start();
