const express = require('express')
const bodyParser = require('body-parser')

const { Users} = require('../db');

const server = express()

const morgan = require('morgan')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

server.use(morgan('dev'))

server.post("/users", (req,res,next) => {

    Users.create(req.body)

    .then((users) =>{

        res.status(201).send(users);
        
    })
    .catch(err => { res.status(404).send(err) });

});

server.listen(8000, () => {
    console.log("Server running on 8000");
});

module.exports = server;