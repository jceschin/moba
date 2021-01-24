const express = require('express')

const bodyParser = require('body-parser')

const { Users} = require('../db');

const server = express()

const morgan = require('morgan')

const { Op } = require("sequelize");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));

server.use(morgan('dev'))

//Create Users

server.post("/users", (req,res,next) => {

    Users.create(req.body)

    .then((users) =>{

        res.status(201).send(users);
        
    })
    .catch(err => { res.status(404).send(err) });

});

//Get all Users

server.get('/users', (req, res) => {

    Users.findAll()
    
	.then((users) => {

        res.send(users);
        
	})
	.catch(err => { res.status(404).send(err) });
});

//Get One Users

server.get('/users/:dni_email', (req, res) => {

	Users.findOne({

		where: {
            [Op.or]: [
                { dni: req.params.dni_email },
                { email: req.params.dni_email}
            ]
        },
       
    })

	.then((sizes) => {

        res.send(sizes);
        
    })
    
	.catch(err => { res.status(404).send(err) });
});


server.listen(8000, () => {
    console.log("Server running on 8000");
});

module.exports = server;