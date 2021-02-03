const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { User, Contact } = require("../db");

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

//routes
//GET ALL CONTACTS FROM USER
server.get(('/get/:user'), (req,res) => {
  const {user} = req.params 
  if(!user){return res.sendStatus(400)}
  User.findOne({
    include:[{model:Contact, as:'contacts'}],
    where:{username:user}
  })
  .then((user) => {
    if(!user){return res.sendStatus(404)}
    if(!user.contacts.length){return res.send("The user not have contacts")}
    res.send(user.contacts)})
})
//ASOCIATE CONTACT
server.post("/add", (req, res) => {
  const { user_username, contact_email, alias } = req.body;
 
  var firstUser = User.findOne({
    where: { username: user_username },
  });
  var contact;

  //searching the future contact by email and creating contact
  User.findOne({
    where: { email: contact_email },
  }).then((contact) => {
    if (!contact) {
      return res
        .status(404)
        .send(
          "Error: The email is not associated to moba, you can invite him, ¿Send email?"
        );
    }
    Contact.create({
      alias: alias || contact.username,
      contact_username: contact.username ,
      contact_name:contact.name ,
      contact_surname:contact.surname,
      contact_phone: contact.phone,
      contact_email: contact.email
    }).then((data) => {
      contact = data;
      firstUser
        .then((user) => {
          if(!user){return res.sendStatus(404)}
          if(contact_email && user.email === contact_email){
            return res.status(400).send('You cant add yourself!')
          }
          user.addContact(contact)
          .then((data) => {console.log(data)})
        })
        .then((data) => res.send(data));
    });
  });
});

server.listen(8006, () => {
  console.log("Contacts microservice running on 8006");
});

module.exports = server;
