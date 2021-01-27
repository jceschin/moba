const express = require("express");

const bodyParser = require("body-parser");

const { User, Blacklist } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const jwt = require('jsonwebtoken');

const {Verifytoken, isAdmin} = require('../middlewares')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));



//Get all Users

server.get("/users", (req, res) => {
  User.findAll()

    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

//Get One Users from dni or email

server.get("/users/:dni_email", Verifytoken, isAdmin, (req, res) => {
  User.findOne({
    where: {
      [Op.or]: [{ dni: req.params.dni_email }, { email: req.params.dni_email }],
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


server.put('/users/:dni', (req, res) => {

	User.update(req.body,

		{
			where: { dni: req.params.dni }
		}
	)
	.then((users) => {

        console.log(users)
		res.status(200).send(users);

	})
	.catch(err => { res.status(404).send(err) });
})


//LOGOUT

server.post('/users/logout', (req,res) => {
  const token = req.headers.authorization.split(" ")[1]
  Blacklist.create({token})
  .then((forbiddenToken) => {
    res.send(forbiddenToken)
  })

})

server.listen(8000, () => {
  console.log("Users microservice running on 8000");
});

module.exports = server;
