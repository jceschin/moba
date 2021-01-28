"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "accounttransactions",
      [
        {
          cvu: "00002",
          number: 1,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 1,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 2,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 2,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 3,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          number: 3,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 4,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 4,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 5,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          number: 5,
          type: "receiver",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          number: 6,
          type: "sender",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00001",
          number: 6,
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
