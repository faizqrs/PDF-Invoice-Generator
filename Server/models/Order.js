const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  sellerDetails: Object,
  placeOfSupply: String,
  billingDetails: Object,
  shippingDetails: Object,
  placeOfDelivery: String,
  orderDetails: Object,
  invoiceDetails: Object,
  reverseCharge: String,
  items: Array,
  totalAmount: Number,
  totalTaxAmount: Number, 
  amountInWords: String,
  signature: String
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
