const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let ItemSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
  },
  product: [
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
  subtotal: {
    type: Number,
    default: 0,
  },
  tax: {
    type: Number,
    default: 20,
  },
  total: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Cart", ItemSchema);
