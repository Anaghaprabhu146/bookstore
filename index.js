// this configure the .env file to the application,the data inside the .env file will be accessible throughout the application via the process of global object
require("dotenv").config();

require("./dbConfig");
const express = require("express");

const cors = require("cors");
const router = require("./routes");

// create a new server
const server = new express();

// middleware to allow resources sharing b/w differnet origins
server.use(cors());

// middleware to parse json,provided by express
server.use(express.json());

// this is a built in midldeware function it serves static files 
server.use('/uploads',express.static('./uploads'))

// router sever

server.use(router);

const port = 3000;

server.listen(port, () => {
  console.log("server is running to", port);
});
