const express = require("express");

const bodyParser = require("body-parser");

const { Accounttransaction } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const cors = require("cors");

const { formatDate } = require("date-utils-2020");
const { reset } = require("nodemon");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(morgan("dev"));
server.use(cors());

//get statistics from cvu and date
//para las estadisticas de un solo dia, en ambos parametros date se debe pasar el mismo dia

server.get("/statistics/:cvu/:dateFrom/:dateTo", (req, res) => {
  let dateFrom = req.params.dateFrom;
  let dateTo =
    req.params.dateTo.substring(0, req.params.dateTo.length - 1) +
    (parseInt(req.params.dateTo[req.params.dateTo.length - 1]) + 1);

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
  };

  Accounttransaction.findAll({
    where: {
      cvu: req.params.cvu,
      createdAt: {
        [Op.lt]: new Date(dateTo),
        [Op.gt]: new Date(dateFrom),
      },
    },
  })
    .then((tr) => {
      if (!tr.length) {
        return res.json([{ stats: null }]);
      }
      console.log(tr);
      tr.forEach((element) =>
        element.type == "charge"
          ? (statistics.charger =
              statistics.charger + (element.new_balance - element.old_balance))
          : element.type == "sender"
          ? (statistics.sender =
              statistics.sender + (element.old_balance - element.new_balance))
          : (statistics.receiver =
              statistics.receiver + (element.new_balance - element.old_balance))
      );

      tr.forEach((element) =>
        element.type == "charge"
          ? statistics.chargerOperations++
          : element.type == "sender"
          ? statistics.senderOperations++
          : statistics.receiverOperations++
      );

      statistics.balanceIni = tr[0].old_balance;
      statistics.balanceFinish = tr[tr.length - 1].new_balance;
      statistics.totalOperations = tr.length;

      res.json([{ ...statistics, dateFrom, dateTo }]);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

//get stats for a lineal graph
server.get("/statistics/lineal/:cvu/:dateFrom/:dateTo", (req, res) => {
  let dateFrom = req.params.dateFrom;
  let dateTo =
    req.params.dateTo.substring(0, req.params.dateTo.length - 1) +
    (parseInt(req.params.dateTo[req.params.dateTo.length - 1]) + 1);

  let formatDateFrom = new Date(dateFrom);
  let formatDateTo = new Date(dateTo);
  const diffTime = Math.abs(formatDateTo - formatDateFrom);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays);
  var timeline;
  var weeks = [];
  const generateWeeks = (data) => {
    if (diffDays > 7) {
      var week1 = {};
      week1.from = formatDateFrom;
      week1.to = new Date(formatDateFrom);
      week1.to.setDate(week1.from.getDate() + 7);
      const week1filter = data.filter(
        (tr) => tr.createdAt >= week1.from && tr.createdAt < week1.to
      );
      weeks.push(week1);
      weeks[0].amount  = week1filter[week1filter.length - 1].new_balance
    }

    if (diffDays > 14) {
      var week2 = {};
      week2.from = week1.to;
      week2.to = new Date(week2.from);
      week2.to.setDate(week2.from.getDate() + 7);
      const week2filter = data.filter(
        (tr) => tr.createdAt >= week2.from && tr.createdAt < week2.to
      );
      weeks.push(week2);
      week2filter.length ? weeks[1].amount  = week2filter[week2filter.length - 1].new_balance : weeks.pop()
      
    }
    if (diffDays > 21) {
      var week3 = {};
      week3.from = week2.to;
      week3.to = new Date(week3.from);
      week3.to.setDate(week3.from.getDate() + 7);
      const week3filter = data.filter(
        (tr) => tr.createdAt >= week3.from && tr.createdAt < week3.to
      );
      weeks.push(week3);
      week3filter.length ? weeks[2].amount  = week3filter[week3filter.length - 1].new_balance : weeks.pop()
    }

    if (diffDays > 28) {
      var week4 = {};
      week4.from = week3.to;
      week4.to = new Date(week4.from);
      week4.to.setDate(week4.from.getDate() + 7);
      const week4filter = data.filter(
        (tr) => tr.createdAt >= week4.from && tr.createdAt < week4.to
      );
      weeks.push(week4);
      week4filter.length ? weeks[3].amount  = week4filter[week4filter.length - 1].new_balance : weeks.pop()
    }
    if (diffDays > 35) {
      var week5 = {};
      week5.from = week4.to;
      week5.to = new Date(week5.from);
      week5.to.setDate(week5.from.getDate() + 7);
      const week5filter = data.filter(
        (tr) => tr.createdAt >= week5.from && tr.createdAt < week5.to
      );
      weeks.push(week5);
      week5filter.length ? weeks[4].amount  = week5filter[week5filter.length - 1].new_balance : weeks.pop()
    }
  };
  Accounttransaction.findAll({
    where: {
      cvu: req.params.cvu,
      status: "confirmed",
      createdAt: {
        [Op.lt]: new Date(dateTo),
        [Op.gt]: new Date(dateFrom),
      },
    },
  })
    .then((data) => {
      if (diffDays < 8 || data.length < 6) {
        var last = {
          date: formatDate(data[data.length - 1].createdAt, "dd/MM/yy"),
          amount: data[data.length - 1].new_balance,
        };
        timeline = data.map((tr) => {
          let date = formatDate(tr.createdAt, "dd/MM/yy");
          let amount = tr.old_balance;
          let obj = { date, amount };
          return obj;
        });

        timeline.push(last);
        return res.send(timeline);
      }
      if (diffDays > 7 && diffDays <= 42) {
        generateWeeks(data);
        return res.send(weeks);
      }
      if (diffDays > 42) {
        return res.send("hola");
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

server.listen(8008, () => {
  console.log("statistics microservice running on 8008");
});

module.exports = server;
