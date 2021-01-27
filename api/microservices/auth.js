const express = require("express");
const server = express();
var morgan = require("morgan");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
var Strategy = require("passport-local").Strategy;

server.use(morgan("dev"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

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

    .then((users) => {
      res.status(201).send(users);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//login user

server.post("/auth/login", (req, res, next) => {
  passport.authenticate("localStrategy", (err, user, fail) => {
    if (err) {
      return res.send(err);
    }
    if (fail) {
      return res.send(fail.message);
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
