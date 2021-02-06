const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
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
    //[country code][phone number]@s.whatsapp.net
    const wspMsg = client.sendTextMessage(`${req.body.phone}@s.whatsapp.net`, req.body.message)
      .then(res.sendStatus(200))
      .catch((err) => {
        console.log(err);
        res.status(404).send(err);
      })
  });

  server.listen(8007, () => {
    console.log("Whatsapp microservice running on 8007");
  });
  
  module.exports = server;