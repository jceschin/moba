const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { User, Contact, Contactuser } = require("../db");
const WhatsAppWeb = require('baileys');

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());



//routes
//GET ALL CONTACTS FROM USER
server.get("/get/:user", (req, res) => {
  const { user } = req.params;
  if (!user) {
    return res.sendStatus(400);
  }
  User.findOne({

    include: [{ model: Contact, as: 'contacts' }],
    where: { username: user }
  })
    .then((user) => {
      if (!user) { return res.sendStatus(404) }
      if (!user.contacts.length) { return res.send("The user not have contacts") }
      res.send(user.contacts)
    })
});
//ASOCIATE CONTACT
server.post("/add", (req, res) => {
  // user_username: logged user
  // contact_email, alias: contact to be added
  const { user_username, contact_email, alias } = req.body;
  console.log(req.body)
  if(!user_username || !contact_email || !alias){
    console.log(user_username, contact_email, alias)
    return res.status(405).send('Missing parameters')
  }
  var firstUser = User.findOne({
    where: { username: user_username },
  });

  var secondUser = User.findOne({
    where: { email: contact_email },
  });
  var loggedUser;
  var futureContact;

  firstUser
    .then((user) => {
      console.log('user', user)
      //checking if firstUser exists
      if (!user) {
        return res.sendStatus(404);
      }
      if (contact_email && user.email === contact_email) {
        return res.status(400).send("You cant add yourself!");
      }
      loggedUser = user;
    })
    .then(() => {
      //checking if secondUser exists
      console.log('asd')
      secondUser
        .then((user2) => {
          if (!user2) {
            return res
              .status(404)
              .send(
                "Error: The email is not associated to moba, you can invite him, ¿Send email?"
              );
          }
          futureContact = user2;
        })
        .then(() => {
          //checking if the user2 is already a contact of user1
          Contactuser.findOne({
            where: {
              iscontact_ofuser: loggedUser.id,
              contact_userid: futureContact.id,
            },
          })
            .then((data) => {
              if (data) {
                return res.status(400).send("You already have this user contact!");
              }
              //creating the contact
              Contact.create({
                alias: alias || futureContact.username,
                contact_username: futureContact.username,
                contact_name: futureContact.name,
                contact_surname: futureContact.surname,
                contact_phone: futureContact.phone,
                contact_email: futureContact.email,
              }).then((contact) => {
                //associating the contact
                loggedUser.addContact(contact).then((contactuser) => {
                  contactuser[0].contact_userid = futureContact.id;
                  contactuser[0].save().then((contactuser) => {
                    res.send('Succesfully');
                  });
                });
              });
            })
            .catch((err) => {
              console.log(err)
            });
        });
    })
    .catch((err) => {
      console.log(err)
    });

});

// CREATE NEW CONTACT
server.post("/contacts", (req, res) => {
  Contact.create(req.body)
    .then(contact => {
      res.status(200).send(contact)
    })
    .catch((err) => {
      console.log('ESTO ES UN ERROR EN LA RUTA', err)
      res.status(404).send(err);
    })
});

// UPDATE CONTACT by alias
server.put("/update/:alias", (req, res) => {
  var newAlias = req.body.newAlias;
  Contact.findOne({
    where:{
      alias: req.params.alias
    }
  })
    .then((contact) => {
      contact.update({
        alias: newAlias
      })
      res.sendStatus(200)
    })
    .catch((err) => console.log(err))
});

// DELETE CONTACT by alias
server.delete("/delete/:alias", (req, res) => {
  Contact.findOne({
    where:{
      alias: req.params.alias
    }
  })
  .then((contact) => {
    contact.destroy()
    res.sendStatus(200)
  })
  .catch((err) => console.log(err))
});


server.listen(8006, () => {
  console.log("Contacts microservice running on 8006");
});

module.exports = server;
