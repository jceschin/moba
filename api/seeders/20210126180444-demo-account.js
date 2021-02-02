"use strict";

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "accounts",
      [
        {
          cvu: "00001",
          balance: "6000",
          opening_date: "10/10/21",
          card_id: "000000005",
          card_expiration: "1030",
          rechargeCode: "123",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          balance: "11000",
          opening_date: "05/05/21",
          card_id: "000000007",
          card_expiration: "0530",
          rechargeCode: "1234",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          balance: "6000",
          opening_date: "05/05/21",
          card_id: "000000008",
          card_expiration: "0530",
          rechargeCode: "12354",
          userId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "000033",
          balance: "6000",
          opening_date: "05/05/21",
          rechargeCode: "12312",
          card_id: "0000000058",
          card_expiration: "05430",
          userId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("accounts", null, {});
  },
};
