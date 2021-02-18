const express = require("express");
const nodemailer = require("nodemailer");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const { Op } = require("sequelize");
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
  console.log(req.body)

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
      email: mail.toLowerCase(), // tiene que encontrar el password antes
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

//RECOVERY USER (send token)
server.post("/recovery/sendtoken", (req, res) => {
  const recoveryToken = Math.floor(Math.random() * 90000) + 10000;
  const { dataUser } = req.body;
  console.log(dataUser)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "noreplymoba@gmail.com",
      pass: "yelwfokrlczzdpoq",
    },
  });

  var mailOptions = {
    from: "noreplymoba@gmail.com",
    to: "",
    subject: "Password recovery - moba",
    html: `Hi, for recovery your password, please use the following code: ${recoveryToken}. <br />`,
  };


  const send = () => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json(error.message);
      } else {
        console.log("Recovery token sent");
      }
    });
  };
  console.log(dataUser);

  if(!dataUser){return res.sendStatus(400)}

  //send mail
  User.findOne({
    where: { [Op.or]: [{ email: dataUser.toLowerCase() }, { username: dataUser.toLowerCase() }] },
  }).then((user) => {
    if (!user) {
      return res.json([{
        emailOrUsername: false
      }])
    }
    user.recoveryToken = recoveryToken 
    user.save().then((user) => {
      mailOptions.to = user.email
      send()
      //Token expires after 5mins
      setTimeout(() => {
        user.recoveryToken = null
        user.save().then(() => {console.log('recovery token expired')})
      },300000)
      res.json([{
        emailOrUsername: true,
        emailToken: dataUser
      }])
    })
  });
});

server.post('/recovery/verifytoken', (req,res) => {
  const {dataUser, token} = req.body 
  console.log("Es de verify", req.body)
  console.log(parseInt(token))
  if(!dataUser || !token){return res.sendStatus(400)}
  User.findOne({
    where:{[Op.or] :[{ email: dataUser.toLowerCase() }, { username: dataUser.toLowerCase() }]}
  })
  .then((user) => {

    if(!user){
      return res.json([{
        recoveryToken: 'user not exists', 
      }])
    }
    if(!user.recoveryToken){
      return res.json([{
        recoveryToken: 'expired token', 
      }])
    }
    if(user.recoveryToken !== token.toString()){
      console.log(typeof token)
      console.log(typeof user.recoveryToken)
      return res.json([{
        recoveryToken: 'invalid token', 
      }])
    }
    res.json([{
      recoveryToken: 'valid token', 
    }])
  })
})

server.put('/recovery/changepassword', (req,res) => {
  const {dataUser, password} = req.body 
  if(!dataUser || !password){
    return res.json([{ 
      changePassword: 'User or password not received'
    }])
  }
  User.findOne({
    where:{[Op.or] :[{ email: dataUser.toLowerCase() }, { username: dataUser.toLowerCase() }]}
  })
  .then((user) => {
    if(!user){
      return res.json([{ 
        changePassword: 'User not exists'
      }])
    }
    user.password = password
    user.save().then(() => {
      res.json([{ 
        token:  Math.floor(Math.random() * 90000) + 10000,
        changePassword: 'Password changed succesfully'
      }])
    })
  })
})

//Enviar mail al sender
server.post("/send-email-sender", (req, res) => {
  const { email, amount, recieverUsername, senderUsername } = req.body;
  console.log(req.body)

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
    subject: "Transfer Confirmation - Moba",
    html: `<h3>This is a message from Moba Team:</h3>
    </br>
     <h4>Dear ${senderUsername} you have sent US$${" "}${amount} to ${recieverUsername}.
     You could get your transfer receipt by login into de app.</h4>
     </br>
     <h4>This is an automatically generated message. Please don't reply it.</h4>`
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
  send();
})

  //Enviar mail al reciever
server.post("/send-email-reciever", (req, res) => {
  const { email, amount, senderUsername, recieverUsername } = req.body;
  console.log(req.body)

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
    subject: "Transfer Confirmation - Moba",
    html: `<h3>This is a message from Moba Team:</h3>
    </br>
     <h4>Dear ${recieverUsername} you have received US$${" "}${amount} from ${senderUsername}. 
     You could check it by login into de app.</h4>
     </br>
     <h4>This is an automatically generated message. Please don't reply it.</h4>`
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
  send();
})

server.listen(8005, () => {
  console.log("Server running on 8005");
});

module.exports = server;
