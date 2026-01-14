const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  noOfPages: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default:0,
  },
  abstract: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },

  ISBN: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
// uploadimages are uploaded will only be available at req .files
  uploadImages: {
    type: Array,
    required: true,
  },
// usermail comes form token,we will decode the token in the middleware and updates the req 
  userMail: {
    type: String,
    required: true,
  },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
