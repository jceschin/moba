const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { Accounts } = require('../db');

// middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

//Create account

server.post("/accounts", (req,res,next) => {

    Accounts.create(req.body)

    .then((accounts) =>{

        res.status(201).send(accounts);

    })
    .catch(err => { res.status(404).send(err) });

});

// get all accounts

server.get("/accounts", (req, res, next) => {

    Accounts.findAll()
    .then((accounts) => {
        res.send(accounts);
    })
    .catch(err => { res.status(404).send(err) });

});

// get specific account by cvu

server.get("/accounts/:cvu", (req, res, next) => {

    Accounts.findOne({
        where:{
            cvu: req.params.cvu
        }
    })
    .then(account => res.send(account))
    .catch(err => { res.status(404).send(err) });

});

// update accounts by cvu

server.put("/accounts/:cvu", (req, res) => {
    Accounts.update(req.body,
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