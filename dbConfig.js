// a file to config db and node .js

// import mongoos

const mongoose = require("mongoose");

// mongoose connect-using connection string
mongoose
  // added the project name in b/w /?
  .connect(process.env.connectionString)
  .then((res) => {
    console.log("connected to mongoDB");
  })
  .catch((res) => {
    console.log("connection db is failed");
  });
