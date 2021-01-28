'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('transactions', [{
      number: 1,
      amount: 5000,
      description: '$5000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 2,
      amount: 500,
      description: '$500 to Michael',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 3,
      amount: 5000,
      description: '$5000 to Jana',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      number: 4,
      amount: 2000,
      description: '$2000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 5,
      amount: 1000,
      description: '$1000 to Jana',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 6,
      amount: 500,
      description: '$2000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
