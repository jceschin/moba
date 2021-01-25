const express = require('express')
const server = express()
var morgan = require('morgan')

server.use(morgan('dev'))



server.get("/auth", (req, res) => {
    res.send('AUTHORIZED')
  });

server.listen(8002, () => {
    console.log("Auth microservice running on 8002");
  });

  module.exports = server;