const express = require("express");

const bodyParser = require("body-parser");

const { User, Account, Blacklist, Contact } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const jwt = require("jsonwebtoken");

const { Verifytoken, isAdmin } = require("../middlewares");

const cors = require("cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));
server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Get all Users

server.get("/users", Verifytoken, isAdmin, (req, res) => {
  User.findAll({
    include: [Account],
  })

    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//Get One Users from dni, email, username
server.get("/users/:dni_email", (req, res) => {
  User.findOne({
    include: [{all: true}],

    where: {
      [Op.or]: [
        { dni: req.params.dni_email },
        { email: req.params.dni_email },
        { username: req.params.dni_email },
      ],
    },
  })

    .then((sizes) => {
      if (!sizes) {
        return res.sendStatus(404);
      }

      return res.send(sizes);
    })

    .catch((err) => {
      res.status(404).send(err);
    });
});

// Update Users from dni

server.put("/users/:dni", Verifytoken, (req, res) => {
  User.update(
    req.body,

    {
      where: { dni: req.params.dni },
    }
  )
    .then((users) => {
      console.log(users);
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//LOGOUT

server.post("/users/logout", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  Blacklist.create({ token }).then((forbiddenToken) => {
    res.send(forbiddenToken);
  });
});

server.listen(8000, () => {
  console.log("Users microservice running on 8000");
});

module.exports = server;
