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
  const email = req.body.email;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  const valideId = Math.floor((Math.random() * 100) + 54);
  const host = req.get("host");

  Email.create({
    email: email,
    valideId: valideId,
  })
    .then(() => {
      const linkRedirect = `http://${host}/verify?valideId=${valideId}`;

      const mailOptions = {
        from: "noreplymoba@gmail.com",
        to: email,
        subject: "Confirmacion Email",
        html: `Su cuenta para la aplicación moba se ha confirmado. Pulse el siguiente enlace para confirmar la dirección de correo electronico. <br />
       <a href= ${linkRedirect}> seguir el proceso </a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json(error.message);
        } else {
          console.log("Email enviado");
          res.status(200).jsonp(req.body);
        }
      });
    })
    .then(result => {
      res.json(result);
    })
    .catch((err) => {
      console.log("Error no se puede enviar el email: " + err);
    });
});

server.get("/verify", (req, res) => {
  const { valideId } = req.query;


  Email.findOne({
    where: {
      valideId: valideId,
    },
  })
    .then((res) => {
      console.log(res);
      if (!res) {
        console.log("No se pudo validar el email");
        res.status(404).json("No se pudo validar el email");
      } else {
        Email.update(
          {
            valide: true,
          },
          {
            where: { valideId: valideId },
          }
        );
      }
    })
    .then(result => {
      res.send();
    })
    .catch((err) => {
      console.log("No se encontro valideId: " + err);
    });
});

server.get("/email", (req, res) => {
  const { email } = req.query;

  Email.findOne({
    where: {
      email: email,
    }
  })
  .then(result => {
    if(!result) {
      console.log("Email no encontrado");
      res.status(404).send();
    }else {
      res.json(result);
    }
  })
})

server.listen(8005, () => {
  console.log("Server running on 8005");
});

module.exports = server;
