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
          card_cvv: "111",
          rechargeCode: "123",
          userId: 111,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00002",
          balance: "11000",
          opening_date: "05/05/21",
          card_id: "000000007",
          card_expiration: "0530",
          card_cvv: "222",
          rechargeCode: "1234",
          userId: 112,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "00003",
          balance: "6000",
          opening_date: "05/05/21",
          card_id: "000000008",
          card_expiration: "0530",
          card_cvv: "333",
          rechargeCode: "12354",
          userId: 113,
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
          card_cvv: "444",
          userId: 114,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          cvu: "2222226194980634363704",
          balance: "6000",
          opening_date: "05/05/20",
          rechargeCode: "43001136",
          card_id: "4143095137322319",
          card_expiration: "17/05/28",
          card_cvv: "286",
          userId: 121,
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
