const express = require("express");
const server = express();
var morgan = require("morgan");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

server.use(morgan("dev"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!req.body || !email || !password) {
    return res.sendStatus(400);
  }
  User.findOne({
    where: { email },
  }).then((user) => {
    if (!user) {
      return res.sendStatus(404);
    }
    const auth = user.correctPassword(password);
    if (!auth) {
      return res.sendStatus(401);
    }
    const token = jwt.sign(user.email, "mobaAuth");
    res.json({ token });
  });
});

server.listen(8001, () => {
  console.log("Auth microservice running on 8001");
});

module.exports = server;
