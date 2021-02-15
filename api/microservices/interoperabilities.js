const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { Interoperability } = require("../db");

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());


//routes

// PERFORM TRANSACTION WITH OTHER WALLET
server.post();

// ASK FOR INFO ABOUT THE TRANSACTION
server.get();


server.listen(8009, () => {
    console.log("Interoperabilities microservice running on 8009");
  });
  
  module.exports = server;