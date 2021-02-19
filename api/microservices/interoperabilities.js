const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const {
  Interoperability,
  Transaction,
  Accounttransaction,
  Account,
  User,
} = require("../db");
const axios = require("axios");
// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

//routes

// PERFORM TRANSACTION WITH OTHER WALLET
//server.post();

// ASK FOR INFO ABOUT THE TRANSACTION
//server.get();

//RECEIVE MONEY FROM ANOTHER APP
server.get("/:cvu", (req, res) => {
  var account;
  var trData;
  axios.get(`https://intermoba.herokuapp.com/${req.params.cvu}`).then((tr) => {
    if (tr.data === "empty") {
      return res.send("Not new transactions");
    }
    trData = tr.data;
    Account.findOne({
      include: [{ model: User }],
      where: { cvu: tr.data.cvu_receiver },
    })
      .then((acc) => {
        if (!acc) {
          axios.post("https://intermoba.herokuapp.com/changestatus", {
            cvu: tr.data.cvu_receiver,
            status: "cancelled",
            id: tr.data.id,
            message: "Invalid CVU",
          });
          return res.status(404).send("Invalid cvu");
        }
        console.log(acc);
        acc.balance = parseInt(acc.balance) + parseInt(trData.amount);
        acc.save().then((acc) => {
          console.log(acc.balance);
          account = acc;
          const user = `${account.user.dataValues.name} ${account.user.dataValues.surname}`;
          Transaction.create({
            amount: trData.amount,
            transaction_type: "transfer",
            status: "confirmed",
            interoperation: true,
          }).then((tr) => {
            Accounttransaction.create({
              cvu: account.cvu,
              number: tr.dataValues.number,
              type: "receiver",
              old_balance: parseInt(acc.balance) - parseInt(trData.amount),
              new_balance: acc.balance,
              status: "confirmed",
              interoperation: trData.name_sender,
            }).then(() => {
              axios
                .post("https://intermoba.herokuapp.com/changestatus", {
                  user,
                  cvu: account.cvu,
                  status: "confirmed",
                  id: trData.id,
                })
                .then((tr) => res.send(tr.data));
            });
          });
        });
      })
      .catch((err) => console.log(err));
  });
});

//SEND MONEY TO ANOTHER APP
server.post("/send/:cvu", (req, res) => {
  const { cvu } = req.params;
  const { amount, description, contactId } = req.body;
  console.log(req.body)
  var transf;
  var mobatransf
  if (!amount || typeof parseInt(amount) !== "number" || parseInt(amount) < 0) {
    return res.status(400).send("Invalid amount");
  }
  axios
    .post(
      `https://bank-tree.herokuapp.com/movement/envio3eros/${cvu}`,
      req.body
    )
    .then((transf) => {
      if (!transf.data) {
        return res.send("Somebody went wrong.");
      }
      transf = transf.data;
      Account.findOne({
        where: { cvu: contactId },
      })
        .then((acc) => {
          if (!acc) {
            return res.status(404).send("Invalid account");
          }
          acc.balance = parseInt(acc.balance) - parseInt(amount);
          acc.save().then((acc) => {
            console.log(acc.balance);
            account = acc;
            Transaction.create({
              amount,
              transaction_type: "transfer",
              status: "confirmed",
              description,
              interoperation: true,
            }).then((tr) => {
              mobatransf = tr 
              Accounttransaction.create({
                cvu: account.cvu,
                number: tr.dataValues.number,
                type: "sender",
                old_balance: parseInt(acc.balance) + parseInt(amount),
                new_balance: acc.balance,
                status: "confirmed",
                interoperation: transf.name,
              }).then((acctrans) => {
                let payload = {...tr.dataValues, treename:transf.name, description: transf.description, cvu}
                res.send(payload)
              })

            });
          });
        })
        .catch((err) => console.log(err));
    });
});
server.listen(8009, () => {
  console.log("Interoperabilities microservice running on 8009");
});

module.exports = server;
