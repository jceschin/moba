const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { Email, User } = require("../db");

// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors(/* {origin: "http://localhost:19006", credentials: true} */));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});


server.post("/send-email", (req, res) => {
  const valideId = Math.floor(Math.random() * 90000) + 10000;
  const { email } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  const mailOptions = {
    from: "noreplymoba@gmail.com",
    to: email,
    subject: "Email confirmation - moba",
    html: `Welcome to moba! Please confirm your email with the following code: ${valideId}. <br />`,
  };

  const send = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        console.log("Email enviado");
      }
    });
  };

  Email.findOne({
    where: {
      email: email,
    },
  })
    .then((result) => {
      if (!result) {
        Email.create({
          email: email,
          valideId,
        }).then(() => {
          send();
        });
      } else {
        result.valideId = valideId;
        result.save().then(() => {
          send();
        });
      }
    })
    .then(() => {
      res.send({email: email});
    })
    .catch((err) => {
      console.log("Error no se puede enviar el email: " + err);
    });
});

server.post("/verify", (req, res) => {
  //const { valideId } = req.query;
  const { valideId, email } = req.body;

  console.log(req.body)

  if(!valideId || !email){return res.sendStatus(400)}

  Email.findOne({
    where: {
      email,
      valideId,
    },
  })
    .then((result) => {
      console.log(result)
      if (!result) {

        return res.json([{
          isvalid: false, 
        }]);

      } else {
     result.update({
       valide: true,
     }) 
    }

    }).then((result) => {
      console.log(result)
      res.json([{
        isvalid: true, 
      }])

    })
  
    .catch((err) => {
      console.log("No se encontro valideId: " + err);
    });
});

server.post('/findUserName', (req, res) => {
  const { mail, password } = req.body;
  console.log(req.body)

  if(!mail || !password){return res.sendStatus(400)};

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  const send = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        console.log("Email enviado");
      }
    });
  };

  var mailOptions
 
  User.findOne({
    where: {
      email: mail, // tiene que encontrar el password antes
    },
  }).then((user) => {
    if(!user){
      return res.json([{
        foundUsername: false, 
      }])
    }
    console.log(user)
    const auth = user.correctPassword(password) 
    console.log(auth)
    if(auth === false){
      return res.json([{
        foundUsername: false, 
      }])

    }
    else{
        mailOptions = {
        from: "noreplymoba@gmail.com",
        to: mail,
        subject: "Username Recovery - moba",
        html: `Your username is ${user.username}, you can use it again to enter your moba account. <br />`,
      };
    send()
    }
  })
    .then(() => {
      return res.json([{
        foundUsername: true, 
      }])
      console.log(res.send)
    })
    .catch((err) => {
      console.log("Error no se puede enviar el email: " + err);
    });

  
})



server.listen(8005, () => {
  console.log("Server running on 8005");
});

module.exports = server;
