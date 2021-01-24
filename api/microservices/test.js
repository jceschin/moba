const express = require('express')
const server = express()
var morgan = require('morgan')

server.use(morgan('dev'))

server.get("/test", (req, res) => {
    res.json({ test: "OK" });
  });

server.listen(3001, () => {
    console.log("Server running on 3001");
  });

  module.exports = server;