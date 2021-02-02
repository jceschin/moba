"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "accounttransactions",
      [
        {
          cvu: "00002",
          number: 111,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 111,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 222,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 222,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 333,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          number: 333,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 444,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 444,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 555,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          number: 555,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 666,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 666,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("accounttransactions", null, {});
  },
};
