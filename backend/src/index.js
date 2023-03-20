const express = require("express");
const mongoose = require("mongoose");
// const authHandler = require("./middleware/auth");
const router = require("./routes/customers/customer.controller");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// app.use(authHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/CustomerOrders")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(`Couldn't connected to MongoDB, ${error}`));

app.use("/customers", router);

app.listen(5000, () => console.log("App is listening at port 5000"));
