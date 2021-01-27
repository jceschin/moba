const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/send-email", (req, res) => {
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  const linkRedirect = "http://localhost:8080/auth/singup";

  const mailOptions = {
    from: "noreplymoba@gmail.com",
    to: email,
    subject: "Confirmacion Email",
    html: `Su cuenta para la aplicacion moba se a confirmado. Pulse el siguiente enlace para confirmar la direcion de correo electronico. <br />
     <a href= ${linkRedirect}> seguir el proceso </a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      res.status(500).json(error.message);
    }else {
      console.log("Email enviado");
      res.status(200).jsonp(req.body);
    }
  });
});

server.listen(8005, () => {
  console.log("Server running on 8005");
});

module.exports = server;
