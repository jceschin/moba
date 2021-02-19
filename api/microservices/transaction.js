const express = require("express");

const bodyParser = require("body-parser");

const { User, Account, Transaction, Accounttransaction, Unregistered } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const { Verifytoken, isAdmin } = require("../middlewares");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));

const cors = require("cors");
server.use(cors());

server.post("/transaction", (req, res, next) => {

  if ( typeof parseInt(req.body.amount) !== "number" || parseInt(req.body.amount) <= 0) {
    return res.sendStatus(400);
  }

  else (async function () {

    try {

      //Find Account Sender
      const balance_sender = await Account.findOne({
        where: {
          cvu: req.body.cvu_sender,
        },
      });

      //Create Transaction
      const transaction = await Transaction.create({
        description: req.body.description,
        amount: req.body.amount,
        transaction_type: "transfer",
        transaction_code: Math.floor((Math.random() * 9000) + 1000)
      });

      //Create Accounttransaction sender
      const sender = await Accounttransaction.create({
        cvu: req.body.cvu_sender,
        number: transaction.number,
        type: "sender",
        old_balance: balance_sender.dataValues.balance,
        new_balance: balance_sender.dataValues.balance,
      });

      if( !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.cvu_receiver)) ){

        //Find Account receiver
        const balance_receiver = await Account.findOne({
          where: {
            cvu: req.body.cvu_receiver,
          },
        }); 

        //Create Accounttransaction receiver
        const receiver = await Accounttransaction.create({
          cvu: req.body.cvu_receiver,
          number: transaction.number,
          type: "receiver",
          old_balance: balance_receiver.dataValues.balance,
          new_balance: balance_receiver.dataValues.balance,
        });

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
        }
        else {
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

      }
      else if( /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(req.body.cvu_receiver) ){
        
        //Create Unregistered
        const  unregistered = await Unregistered.create({
          email: req.body.cvu_receiver,
          transactionNumber: transaction.number,
        })

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
        }
        else {

          //Cancelled Unregistered 
          const unregisteredFail = await Unregistered.update(
            {
              status: "cancelled",
            },
  
            {
              where: { transactionNumber: transaction.number },
            }
          );

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


      }

    } catch (err) { res.status(404).send(err); }
  })();

})

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

server.get("/transaction/users/:dni_email", (req, res, next) => {
  User.findOne({
    include: [{ model: Account, include: Transaction }],
    where: {
      [Op.or]: [
        { dni: req.params.dni_email },
        { email: req.params.dni_email.toLowerCase() },
        { username: req.params.dni_email.toLowerCase() },
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
              if(!dat.interoperation){
                payload.type = "transfer";
                payload[dat.accounts[0].accounttransaction.type] =
                  dat.accounts[0].user.username;
                payload[dat.accounts[1].accounttransaction.type] =
                  dat.accounts[1].user.username;
              }
              else{
                var interop = dat.accounts[0]
                console.log('interop', interop)
                payload.type = "interoperation"
                if(interop.accounttransaction.type === 'receiver'){
                  payload.sender = interop.accounttransaction.interoperation
                  payload.receiver = interop.user.username
                }
                else{
                  payload.sender = interop.user.username
                  payload.receiver = interop.accounttransaction.interoperation
                }
              }
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

//get Transaction for receipt

server.get("/transaction/receipt/:cvu", Verifytoken, (req, res, next) => {


  (async function () {
 
     try {

      let email_sender, fullName_sender; 

      const user = await Account.findOne({
        include: [User],
    
        where: {
          cvu: req.params.cvu,
        },
      })

      email_sender= user.dataValues.user.dataValues.email;
      fullName_sender= user.dataValues.user.dataValues.name + " " + user.dataValues.user.dataValues.surname;

      const transaction = await Accounttransaction.findAll({
        where: {
          cvu: req.params.cvu,
        },
      })


     const arr = transaction.map(async trans => {

        const receiver= await Transaction.findAll
        
        ({
          
          include: [
            {
              model: Account,
              include: [User],
              where: {
                cvu: {
                  [Op.ne]: req.params.cvu
                }
              },
            },
          ],
          where: {
            number: trans.dataValues.number,
          },
        }) 

        return receiver
    
      })

      const result = await Promise.all(arr)

      /* const arr3 =  result.map(async function (res) {

        if(res[0].dataValues.accounts[0].dataValues.accounttransaction.type == "receiver")
        {
           
          let receipt = {

            transactionNumber: "",
            amount: 0,
            fullName_receiver: "",
            cvu_receiver: "",
            email_receiver: "",
            fullName_sender,
            cvu_sender: req.params.cvu,
            email_sender,
            date: ""
          }

          receipt.cvu_receiver = res[0].dataValues.accounts[0].dataValues.accounttransaction.cvu;

          receipt.date = res[0].dataValues.accounts[0].dataValues.accounttransaction.createdAt;

          receipt.fullName_receiver = res[0].dataValues.accounts[0].dataValues.user.dataValues.name + " " + res[0].dataValues.accounts[0].dataValues.user.dataValues.surname;

          receipt.email_receiver = res[0].dataValues.accounts[0].dataValues.user.dataValues.email;

          receipt.transactionNumber = res[0].dataValues.number;

          receipt.amount = res[0].dataValues.amount;

          return receipt

        }  

      }) */


      res.send(result)
 
     } catch (err) { res.status(404).send(err); }
   })();
 
})

//get Transaction for receipt by cvu sender and number transaction 


server.get("/transaction/receipt/:cvu/:number", Verifytoken, (req, res, next) => {

  (async function () {
 
     try {

      let email_sender, fullName_sender; 

      const user = await Account.findOne({
        include: [User],
    
        where: {
          cvu: req.params.cvu,
        },
      })

      email_sender= user.dataValues.user.dataValues.email;
      fullName_sender= user.dataValues.user.dataValues.name + " " + user.dataValues.user.dataValues.surname;

      const receiver= await Transaction.findAll ({

        include: [
          {
            model: Account,
            include: [User],
            where: {
              cvu: {
                [Op.ne]: req.params.cvu
              }
            },
          },
        ],
        where: {
          number: req.params.number,
        },
      }) 

      var receipt = {

        transactionNumber: req.params.number,
        amount: receiver[0].dataValues.amount,
        fullName_receiver: receiver[0].dataValues.accounts[0].dataValues.user.dataValues.name + " " + receiver[0].dataValues.accounts[0].dataValues.user.dataValues.surname,
        cvu_receiver: receiver[0].dataValues.accounts[0].dataValues.accounttransaction.cvu,
        email_receiver: receiver[0].dataValues.accounts[0].dataValues.user.dataValues.email,
        fullName_sender,
        cvu_sender: req.params.cvu,
        email_sender,
        date: receiver[0].dataValues.accounts[0].dataValues.accounttransaction.createdAt
      }

      console.log(receiver[0].dataValues)

      res.send(receipt)

 
     } catch (err) { res.status(404).send(err); }
   })();
 
})


server.listen(8001, () => {
  console.log("Transaction running on 8001");
});

module.exports = server;
