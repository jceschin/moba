const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { Account, User} = require('../db');
const { Op } = require("sequelize");

// middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

//Create account

//Pasar por body en el objeto una key "user", con dni o email, para generar la relacion

server.post("/accounts", (req,res,next) => {

    User.findOne({
        
        where: {

            [Op.or]: [{ dni: req.body.user }, { email: req.body.user }],

        },

    })

    .then((user) => {

       return Account.create({
           
           cvu: req.body.cvu,
           balance: req.body.balance,
           card_id: req.body.card_id,
           card_expiration: req.body.card_expiration,
           userId: user.dataValues.id

        })
       

    })

    .then((acc) => {
        
		res.status(200).send(acc);

    })
    
	.catch(err => { res.status(404).send(err) });
  
});

// get all accounts

server.get("/accounts", (req, res, next) => {

    Account.findAll(
        {
			include: [User],
		}
    )
    .then((accounts) => {
        res.send(accounts);
    })
    .catch(err => { res.status(404).send(err) });

});

// get specific account by cvu

server.get("/accounts/:cvu", (req, res, next) => {

    Account.findOne({

        include: [User],

        where:{
            cvu: req.params.cvu
        }
    })
    .then(account => res.send(account))
    .catch(err => { res.status(404).send(err) });

});

// update accounts by cvu

server.put("/accounts/:cvu", (req, res) => {
    Account.update(req.body,
        {
            where:  {cvu: req.params.cvu }
        }
        )
    .then(account => res.status(200).send(account))
    .catch(err => { res.status(404).send(err) });
});

server.listen(8004, () => {
    console.log("Server running on 8004");
});

module.exports = server;