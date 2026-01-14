const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema({
  bookId: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  bookDesc: {
    type: String,
    required: true,
  },
  bookImage: {
    type: String,
    required: true,
  },
  buyerMail: {
    type: String,
    required: true,
  },
  sellerMail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
});


const purchaseModel=mongoose.model('purchases',purchaseSchema)

module.exports =purchaseModel