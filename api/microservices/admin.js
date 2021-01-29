const express = require('express');
const server = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { User } = require('../db');
const cors = require('cors')

// middlewares
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true}));
server.use(cors())
// promote user by id

server.put("/admin/:id",(req,res) => {

    User.update(req.body,
        {
            where: { dni: req.params.id }
        }
    )
    .then(users => 
        {   
         res.status(200).send(users)
        }
    )
    .catch(err => { res.status(404).send(err) });
});

server.listen(8003, () =>{
    console.log("Server running on 8003");
});

module.exports = server;
