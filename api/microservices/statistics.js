const express = require("express");

const bodyParser = require("body-parser");

const { Accounttransaction } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const cors = require("cors");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));
server.use(cors());

//get statistics from cvu and date
//para las estadisticas de un solo dia, en ambos parametros date se debe pasar el mismo dia

server.get("/statistics/:cvu/:dateFrom/:dateTo" ,(req, res) => {

  let dateFrom = req.params.dateFrom;
  let dateTo = req.params.dateTo.substring(0, req.params.dateTo.length - 1) + (parseInt(req.params.dateTo[req.params.dateTo.length -1]) + 1);

  let statistics = {
    charger: 0,
    sender: 0,
    receiver: 0,
    balanceIni: 0,
    balanceFinish: 0,
    senderOperations: 0,
    receiverOperations: 0,
    chargerOperations: 0,
    totalOperations: 0,
  }
 
  Accounttransaction.findAll({
    where:{
      cvu : req.params.cvu,
      createdAt: {
        [Op.lt]: new Date(dateTo),
        [Op.gt]: new Date(dateFrom)
      }
    }
  })
  .then((tr) => {

    tr.forEach(element => 
      element.type == "charge" ? statistics.charger = statistics.charger + (element.new_balance - element.old_balance) :
      element.type == "sender" ? statistics.sender = statistics.sender + (element.old_balance - element.new_balance):
      statistics.receiver = statistics.receiver + (element.new_balance - element.old_balance)
    );

    tr.forEach(element => 
      element.type == "charge" ? statistics.chargerOperations++ :
      element.type == "sender" ? statistics.senderOperations++ :
      statistics.receiverOperations++
    );


    statistics.balanceIni = tr[0].old_balance;
    statistics.balanceFinish = tr[tr.length -1 ].new_balance;
    statistics.totalOperations = tr.length;

    res.send(statistics);
	})
	.catch(err => { res.send(err) });
})

server.listen(8007, () => {
  console.log("statistics microservice running on 8007");
});

module.exports = server;
