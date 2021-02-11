const express = require("express");

const bodyParser = require("body-parser");

const { User, Account, Transaction, Accounttransaction } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const { Verifytoken, isAdmin } = require("../middlewares");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));

const cors = require("cors");
server.use(cors());

// Create Transaction

server.post("/transaction", (req, res, next) => {
  console.log(req.body);
  if (
    typeof parseInt(req.body.amount) !== "number" ||
    parseInt(req.body.amount) <= 0
  ) {
    return res.sendStatus(400);
  }
  (async function () {
    try {
      //Account sender
      const balance_sender = await Account.findOne({
        where: {
          cvu: req.body.cvu_sender,
        },
      });

      //Account receiver
      const balance_receiver = await Account.findOne({
        where: {
          cvu: req.body.cvu_receiver,
        },
      });

      //Create transaction
      const transaction = await Transaction.create({
        ...req.body,
        transaction_type: "transfer",
        transaction_code: Math.floor((Math.random() * 9000) + 1000)
      });

      //Create table Accounttransaction
      const sender = await Accounttransaction.create({
        cvu: req.body.cvu_sender,
        number: transaction.number,
        type: "sender",
        old_balance: balance_sender.dataValues.balance,
        new_balance: balance_sender.dataValues.balance,
      });

      const receiver = await Accounttransaction.create({
        cvu: req.body.cvu_receiver,
        number: transaction.number,
        type: "receiver",
        old_balance: balance_receiver.dataValues.balance,
        new_balance: balance_receiver.dataValues.balance,
      });

      //Balance check
      if (balance_sender.dataValues.balance >= parseInt(req.body.amount)) {
        //Update balance sender
        const new_balance_sender = await Account.update(
          {
            balance: balance_sender.dataValues.balance - req.body.amount,
          },

          {
            where: { cvu: req.body.cvu_sender },
          }
        );

        //Update Accounttransaction sender
        const upAccounttransactionSender = await Accounttransaction.update(
          {
            new_balance: balance_sender.dataValues.balance - req.body.amount,
            status: 'confirmed'
          },

          {
            where: {
              cvu: req.body.cvu_sender,
              number: transaction.number,
            },
          }
        );

        //Update balancer receiver
        const new_balance_receiver = await Account.update(
          {
            balance:
              parseFloat(req.body.amount) +
              parseFloat(balance_receiver.dataValues.balance),
          },

          {
            where: { cvu: req.body.cvu_receiver },
          }
        );

        //Update Accounttransaction reseiver
        const upAccounttransactionreseiver = await Accounttransaction.update(
          {
            new_balance:
              parseFloat(req.body.amount) +
              parseFloat(balance_receiver.dataValues.balance),
              status:'confirmed'
          },

          {
            where: {
              cvu: req.body.cvu_receiver,
              number: transaction.number,
            },
          }
        );

        //Confirmed transaction
        const transactionConfirmed = await Transaction.update(
          {
            status: "confirmed",
          },

          {
            where: { number: transaction.number },
          }
        );

        res
          .status(201)
          .json({ ...transaction.dataValues, status: "confirmed" });
      } else {
        //Cancelled transaction
        const transactionFail = await Transaction.update(
          {
            status: "cancelled",
          },

          {
            where: { number: transaction.number },
          }
        );

        res
          .status(201)
          .json({ ...transaction.dataValues, status: "cancelled" });
      }
    } catch (err) {
      res.status(404).send(err);
    }
  })();
});

// Get specific Transaction for number

server.get("/transaction/:number", Verifytoken, isAdmin, (req, res, next) => {
  Transaction.findOne({
    include: [Account],

    where: {
      number: req.params.number,
    },
  })
    .then((transaction) => res.send(transaction))
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Get all Transaction for account by cvu

server.get("/transaction/account/:cvu", Verifytoken, (req, res, next) => {
  Transaction.findAll({
    include: [
      {
        model: Account,
        include: [User],
        where: { cvu: req.params.cvu },
      },
    ],
  })
    .then((transaction) => res.send(transaction))
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Get all confirmed Transaction for account by username, dni or email

server.get("/transaction/users/:dni_email", Verifytoken, (req, res, next) => {
  User.findOne({
    include: [{ model: Account, include: Transaction }],
    where: {
      [Op.or]: [
        { dni: req.params.dni_email },
        { email: req.params.dni_email },
        { username: req.params.dni_email },
      ],
    },
  })
    .then((user) => {
      if (!user) {
        return res.sendStatus(404);
      }
      var numberTrans = user.account.transactions.map((tr) => tr.number);
      if (!numberTrans.length) {
        return res.send(numberTrans);
      }
      Transaction.findAll({
        include: [{ model: Account, include: [{ model: User }] }],
        where: { number: { [Op.or]: [numberTrans] }, status: "confirmed" },
        order: [["createdAt", "DESC"]],
      })
        .then((data) => {
          var sorted = data.map((dat, i) => {
            var payload = {};
            payload.transactionID = dat.number;
            payload.transactionCode = dat.transaction_code
            payload.amount = dat.amount;
            payload.description = dat.description;
            payload.date = dat.createdAt;
            if (dat.transaction_type == "transfer") {
              payload.type = "transfer";
              payload[dat.accounts[0].accounttransaction.type] =
                dat.accounts[0].user.username;
              payload[dat.accounts[1].accounttransaction.type] =
                dat.accounts[1].user.username;
            } else {
              payload.type = "recharge";
            }

            return payload;
          });
          res.send(sorted);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.send(err));
});

// Get all Transaction status

server.put("/transaction/status/:status", Verifytoken, (req, res, next) => {
  Transaction.findAll({
    include: [
      {
        model: Account,
        include: [User],
      },
    ],

    where: {
      status: req.params.status,
    },
  })
    .then((transaction) => res.send(transaction))
    .catch((err) => {
      res.status(404).send(err);
    });
});

server.listen(8001, () => {
  console.log("Transaction running on 8001");
});

module.exports = server;
