const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressesSchema = new Schema({
  userId: { type: String ,ref: "User" },
  houseNumber: { type: String },
  latLng: { type: Array, index: '2dsphere' },
  googleAddress: { type: String },
//   isDefault: { type: Boolean, default: true },
  addressType: { type: String },
  created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('addresses', addressesSchema)
