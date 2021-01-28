'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('transactions', [{
      number: '00002',
      amount: '2000',
      description: 'soy una transferencia',
      transaction_type: 'transfer',
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: '00001',
      amount: '3000',
      description: 'soy un envio de dinero',
      transaction_type: 'send',
      status: 'processing',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
