const express = require("express");
const server = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { Account, User, Transaction } = require("../db");
const { Op } = require("sequelize");
const cors = require("cors");

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
//Create account

//Pasar por body en el objeto una key "user", con dni o email, para generar la relacion

server.post("/accounts", (req, res, next) => {
  User.findOne({
    where: {
      [Op.or]: [{ dni: req.body.user }, { email: req.body.user }],
    },
  })

    .then((user) => {
      return Account.create({
        cvu: req.body.cvu,
        balance: req.body.balance,
        card_id: req.body.card_id,
        card_expiration: req.body.card_expiration,
        userId: user.dataValues.id,
      });
    })

    .then((acc) => {
      res.status(200).send(acc);
    })

    .catch((err) => {
      res.status(404).send(err);
    });
});

// get all accounts

server.get("/accounts", (req, res, next) => {
  Account.findAll({
    include: [User],
  })
    .then((accounts) => {
      res.send(accounts);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// get specific account by cvu

server.get("/accounts/:cvu", (req, res, next) => {
  Account.findOne({
    include: [User],

    where: {
      cvu: req.params.cvu,
    },
  })
    .then((account) => res.send(account))
    .catch((err) => {
      res.status(404).send(err);
    });
});

// update accounts by cvu

server.put("/accounts/:cvu", (req, res) => {
  Account.update(req.body, {
    where: { cvu: req.params.cvu },
  })
    .then((account) => res.status(200).send(account))
    .catch((err) => {
      res.status(404).send(err);
    });
});

//RECHARGE MONEY
server.put("/accounts/recharge/:userCode", (req, res) => {
  const rechargeCode = req.params.userCode;
  const { amount } = req.body;
  var account;
  if (!amount || typeof parseInt(amount) !== "number" || parseInt(amount) < 0) {
    return res.status(400).send("Invalid amount");
  }
 
  Account.findOne({
    where: { rechargeCode },
  })
    .then((acc) => {
      if (!acc) {
        return res.status(404).send("Invalid recharge code");
      }
      acc.balance = parseInt(acc.balance) + parseInt(amount);
      acc.save().then((acc) => {
        console.log(acc.balance);
        account = acc;
        Transaction.create({
          amount,
          transaction_type: "charge",
          status: "confirmed",
        }).then((tr) => {
          account.addTransaction(tr);
          res.send(account);
        });
      });
    })
    .catch((err) => console.log(err));
});

server.listen(8004, () => {
  console.log("Server running on 8004");
});

module.exports = server;
