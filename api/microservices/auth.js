const express = require("express");
const server = express();
var morgan = require("morgan");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
var Strategy = require("passport-local").Strategy;
const crypto = require('crypto')
const { formatDate } = require("date-utils-2020");



server.use(morgan("dev"));
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors())

server.use(passport.initialize());

passport.use(
  "localStrategy",
  new Strategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false,
    },
    function (username, password, done) {
      console.log("LOGIN CALLED");
      User.findOne({
        where: {
          username,
        },
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "User not exists." });
          }
          const auth = user.correctPassword(password);
          if (!auth) {
            return done(null, false, { message: "Invalid password." });
          }
          return done(null, user);
        })
        .catch((err) => {

          return done(err);
        });
    }
  )
);

//Create Users

server.post("/auth/singup", (req, res, next) => {
  User.create(req.body)

    .then((user) => {
      var card_id = Math.floor(Math.random() * 900000000000000) + 4000000000000000
      var rechargeCode = Math.floor(Math.random()*90000000) + 10000000
      var cvu = "222222".concat(Math.floor(Math.random() * 9000000000000000) + 1000000000000000)
      var card_expiration = new Date()
      card_expiration.setFullYear(card_expiration.getFullYear() + 6)
      card_expiration = formatDate(card_expiration, "yyyy/MM/dd hh:mm:ss")
      console.log(card_expiration)
      Account.create({
        cvu,
        card_id,
        card_expiration,
        userId: user.dataValues.id,
        rechargeCode,
        opening_date: formatDate(new Date(),"yyyy/MM/dd hh:mm:ss")
      })
      .then((acc) => {
        res.status(200).send(acc);
      })
    })


    .catch((err) => {
      console.log(err)
      res.status(404).send(err);
    });
});

//login user

server.post("/auth/login", (req, res, next) => {
  passport.authenticate("localStrategy", (err, user, fail) => {
    if (err) {
      return res.status(401).send(err);
    }
    if (fail) {
      return res.status(401).send(fail.message);
    }
    console.log("login OK, generating token...");
    const payload = {
      id: user.id,
      iat: Date.now(),
      username: user.username,
    };
    const token = jwt.sign(payload, "mobaAuth");
    res.json({ data: { token: token } });
  })(req, res, next);
});

server.listen(8002, () => {
  console.log("Auth microservice running on 8002");
});

module.exports = server;
