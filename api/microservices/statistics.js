const express = require("express");

const bodyParser = require("body-parser");

const { Accounttransaction } = require("../db");

const server = express();

const morgan = require("morgan");

const { Op } = require("sequelize");

const cors = require("cors");

const { formatDate, toDate } = require("date-utils-2020");
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
        return res.send(null);
      }
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
  var months = [];
  const generateWeeks = (data) => {
    if (diffDays > 7) {
      var week1 = {};
      week1.from = formatDateFrom;
      week1.to = new Date(formatDateFrom);
      week1.to.setDate(week1.from.getDate() + 7);
      week1.date = formatDate(week1.from, "dd/MM/yy");
      const week1filter = data.filter(
        (tr) => tr.createdAt >= week1.from && tr.createdAt < week1.to
      );
      week1filter.length &&
        (week1.amount = week1filter[week1filter.length - 1].new_balance);
      week1filter.length && weeks.push(week1);
    }

    if (diffDays > 14) {
      var week2 = {};
      week2.from = week1.to;
      week2.to = new Date(week2.from);
      week2.to.setDate(week2.from.getDate() + 7);
      week2.date = formatDate(week2.from, "dd/MM/yy");
      const week2filter = data.filter(
        (tr) => tr.createdAt >= week2.from && tr.createdAt < week2.to
      );
      week2filter.length &&
        (week2.amount = week2filter[week2filter.length - 1].new_balance);
      week2filter.length && weeks.push(week2);
    }
    if (diffDays > 21) {
      var week3 = {};
      week3.from = week2.to;
      week3.to = new Date(week3.from);
      week3.to.setDate(week3.from.getDate() + 7);
      week3.date = formatDate(week3.from, "dd/MM/yy");
      const week3filter = data.filter(
        (tr) => tr.createdAt >= week3.from && tr.createdAt < week3.to
      );
      week3filter.length &&
        (week3.amount = week3filter[week3filter.length - 1].new_balance);
      week3filter.length && weeks.push(week3);
    }

    if (diffDays > 28) {
      var week4 = {};
      week4.from = week3.to;
      week4.to = new Date(week4.from);
      week4.to.setDate(week4.from.getDate() + 7);
      week4.date = formatDate(week4.from, "dd/MM/yy");
      const week4filter = data.filter(
        (tr) => tr.createdAt >= week4.from && tr.createdAt < week4.to
      );
      week4filter.length &&
        (week4.amount = week4filter[week4filter.length - 1].new_balance);
      week4filter.length && weeks.push(week4);
    }
    if (diffDays > 35) {
      var week5 = {};
      week5.from = week4.to;
      week5.to = new Date(week5.from);
      week5.to.setDate(week5.from.getDate() + 7);
      week5.date = formatDate(week5.from, "dd/MM/yy");
      const week5filter = data.filter(
        (tr) => tr.createdAt >= week5.from && tr.createdAt < week5.to
      );
      week5filter.length &&
        (week5.amount = week5filter[week5filter.length - 1].new_balance);
      week5filter.length && weeks.push(week5);
    }
  };

  const generateMonths = (data) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];  var exact = new Date(formatDateTo)
    exact.setDate(1)
    var month1 = new Date(exact);
    month1.setMonth(month1.getMonth() - 5);
    var month2 = new Date(exact);
    month2.setMonth(month2.getMonth() - 4);
    var month3 = new Date(exact);
    month3.setMonth(month3.getMonth() - 3);
    var month4 = new Date(exact);
    month4.setMonth(month4.getMonth() - 2);
    var month5 = new Date(exact);
    month5.setMonth(month5.getMonth() - 1);
    var month6 = new Date(exact);

    const month1filter = data.filter(
      (tr) => tr.createdAt >= month1 && tr.createdAt < month2
    );
    if(month1filter.length){
      let m1 = {}
      m1.amount = month1filter[month1filter.length - 1].new_balance
      m1.date = monthNames[month1.getMonth()]
      months.push(m1)
    }
    const month2filter = data.filter(
      (tr) => tr.createdAt >= month2 && tr.createdAt < month3
    );
    if(month2filter.length){
      let m2 = {}
      m2.amount = month2filter[month2filter.length - 1].new_balance
      m2.date = monthNames[month2.getMonth()] 
      months.push(m2)
    }
    const month3filter = data.filter(
      (tr) => tr.createdAt >= month3 && tr.createdAt < month4
    );
    if(month3filter.length){
      let m3 = {}
      m3.amount = month3filter[month3filter.length - 1].new_balance
      m3.date = monthNames[month3.getMonth()]
      months.push(m3)

    }
    const month4filter = data.filter(
      (tr) => tr.createdAt >= month4 && tr.createdAt < month5
    );
    if(month4filter.length){
      let m4 = {}
      m4.amount = month4filter[month4filter.length - 1].new_balance
      m4.date = monthNames[month4.getMonth()]
      months.push(m4)

    }
    const month5filter = data.filter(
      (tr) => tr.createdAt >= month5 && tr.createdAt < month6
    );
    if(month5filter.length){
      let m5 = {}
      m5.amount = month5filter[month5filter.length - 1].new_balance
      m5.date = monthNames[month5.getMonth()]
      months.push(m5)

    }
    const month6filter = data.filter((tr) => tr.createdAt >= month6);
    if(month6filter.length){
      let m6 = {}
      m6.amount = month6filter[month6filter.length - 1].new_balance
      m6.date = monthNames[month6.getMonth()]
      months.push(m6)

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
      if (!data.length) {
        return res.send(null);
      }
      if (diffDays <= 10 || data.length < 5) {
        console.log("ENTRO AL 1RO");
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
        if(!timeline.length){return res.send(null)}
        return res.send(timeline);
      }
      if (diffDays > 10 && diffDays <= 42) {
        console.log("ENTRO AL 2DO");
        generateWeeks(data);
        if(!weeks.length){return res.send(null)}
        return res.send(weeks);
      }
      if (diffDays > 42) {
        generateMonths(data);
        if(!months.length){return res.send(null)}
        return res.send(months);
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
