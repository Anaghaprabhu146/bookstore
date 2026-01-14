const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  proPic: {
    type: String,
    default: "",
  },
  userType: {
    type: String,
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
});

// create model
const userModel=mongoose.model('users',userSchema)

module.exports=userModel