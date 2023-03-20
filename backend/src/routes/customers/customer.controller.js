const express = require("express");
// const errorHandler = require("../../middleware/error");
const Customer = require("../../models/customer");
// const { generateAuthToken } = require("../../utils/helpers");
const createCustomerSchema = require("./validationSchema");

const router = express.Router();

// getting all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.status(200).send(customers);
});

// getting specific customer
router.get("/:id", async (req, res) => {
  const customer = await Customer.findOne({ orderId: req.params.id });
  res.status(200).send(customer);
});

// updating single customer data
router.put("/:id", async (req, res) => {
  const customer = await Customer.findOneAndUpdate(
    {
      orderId: req.params.id,
    },
    req.body
  );

  res.status(200).send(customer);
});

// deleting single customer data
router.delete("/:id", async (req, res) => {
  const customer = await Customer.findOneAndDelete({
    orderId: req.params.id,
  });

  res.status(200).send(customer);
});

// posting customer data
router.post("/", async (req, res) => {
  const payload = req.body;
  const { error } = createCustomerSchema(payload);
  if (error) {
    return res.status(400).send({ message: error.message });
  }
  let customer = new Customer(payload);
  customer = await customer.save();
  res.status(200).send(customer);
});

module.exports = router;
