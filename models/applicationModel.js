const mongoose = require("mongoose"); //1

//schema 2
const appilcationSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
});

//model 3
const applicationModel  = mongoose.model("applications", appilcationSchema);
module.exports = applicationModel ;