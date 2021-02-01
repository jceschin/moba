const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { Email } = require("../db");

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors(/* {origin: "http://localhost:19006", credentials: true} */));

server.post("/send-email", (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  const valideId =  Math.floor(Math.random()*90000) + 10000;
  
  const host = req.get("host");

  Email.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      if (result) {
        console.log("Email ya existente");
        res.json(result);
      } else {
        Email.create({
          email: email,
          valideId: valideId,
        })
          .then((result) => {
            //const linkRedirect = `http://${host}/verify?valideId=${valideId}`;

            const mailOptions = {
              from: "noreplymoba@gmail.com",
              to: email,
              subject: "Email confirmation - moba",
              html: `Welcome to moba! Please confirm your email with the following code: ${valideId}. <br />`
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.status(500).json(error.message);
              } else {
                console.log("Email enviado");
                res.status(200).jsonp(req.body);
              }
            });
            return result;
          })
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log("Error no se puede enviar el email: " + err);
          });
      }
    })
    .catch((err) => {
      console.log("Error buscando un email especifico: " + err);
    });
});

server.post("/verify", (req, res) => {
  //const { valideId } = req.query;
  const { valideId, email } = req.body;
  if(!valideId || !email){return res.sendStatus(400)}
  Email.findOne({
    where: {
      email,
      valideId,
    },
  })
    .then((result) => {
      if (!result) {
        return res.send( false );
      } else {
     Email.update({
       valide: true,
     }, {
       where: {email: email}
     })
    }
    }).then ((res) => {
      res.send ( true )
    })
  
    .catch((err) => {
      console.log("No se encontro valideId: " + err);
    });
});

server.listen(8005, () => {
  console.log("Server running on 8005");
});

module.exports = server;
