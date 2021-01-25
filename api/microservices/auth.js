const express = require('express')
const server = express()
var morgan = require('morgan')

server.use(morgan('dev'))



server.get("/auth", (req, res) => {
    res.send('AUTHORIZED')
  });

server.listen(8001, () => {
    console.log("Auth microservice running on 8001");
  });

  module.exports = server;