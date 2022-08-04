const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  userId: { type: String, ref: "User" },
  products: [
    {
      productId: { type: String, ref: "Products" },
      quantity: {
        type: Number,
        default: 1,
      },
      product_total: {
        type: Number,
        default: 0,
      },
    },
  ],
  subtotal: { type: Number, default: 0 },
  taxes: { type: Number, default: 20 },
  total: { type: Number, default: 0 },
  shipping: { type: Number, default: 500 },
  final_amount: { type: Number, default: 0 },
  addressId: { type: String, ref: "addresses" },
  estimatedDelivery: { type: Date, default: Date.now() },
  deliveredDate: { type: Date, default: Date.now() },
  isDelivered: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("order", orderSchema);
