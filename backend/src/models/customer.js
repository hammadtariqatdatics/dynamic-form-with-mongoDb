//models
const mongoose = require("mongoose");

// customer schema

const customerSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
    unique: true,
  },
  addFields: [
    {
      productId: {
        type: Number,
        required: true,
        unique: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productQuantity: {
        type: Number,
        required: true,
      },
      productTotal: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model("Customers", customerSchema);

module.exports = Customer;
