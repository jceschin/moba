const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { User, Account } = require("../db");
const WhatsAppWeb = require('baileys');

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

/* CONNECT WITH WHATSAPP */
const client = new WhatsAppWeb()
client.connect()
  .then(([user, chats, contacts, unread]) => {
    console.log("oh hello " + user.name + " (" + user.id + ")")
    console.log("you have " + unread.length + " unread messages")
    console.log("you have " + chats.length + " chats")
    console.log("Succesful authentication")
  })
  .catch(err => console.log("unexpected error: " + err))
/* END CONNECT WITH WHATSAPP */

// SEND INVITATION WITH WHATSAPP MESSAGES
server.post("/message", (req, res) => {
  let contactPhone = req.body.phone;
  let message = "They want to add you as a contact. Download MOBA";

  User.findOne({
    where:{
      phone: contactPhone,
    }
  })
    .then((user) => {
      //console.log(user)
      if (user === null) {
        //[country code][phone number]@s.whatsapp.net
        const wspMsg = client.sendTextMessage(`${contactPhone}@s.whatsapp.net`, message)
        return res.sendStatus(200)
      }
      //console.log("Sos usuario de MOBA")
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log("Something whent wrong: " + err);
      res.status(404).send(err);
    })
});

// SEND CVU WITH WHATSAPP MESSAGES
server.post("/:id", (req, res) => {
  let phone = req.body.phone;
  let userId = req.params.id;

  User.findOne({
    include: [Account],
    where: {
      id: userId,
    }
  })
    .then((user) => {
      //console.log(user.account.cvu)
      let userCvu = "CVU: " + user.account.cvu;
      if (userCvu) {
        const wspMsg = client.sendTextMessage(`${phone}@s.whatsapp.net`, userCvu)
        return res.sendStatus(200)
      }
      res.sendStatus(200)
    })
    .catch((err) => {
      console.log("Something went wrong: " + err);
      res.status(404).send(err);
    });
});

server.listen(8007, () => {
  console.log("Whatsapp microservice running on 8007");
});
  
module.exports = server;