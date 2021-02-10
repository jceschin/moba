'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('transactions', [{
      number: 111,
      amount: 5000,
      description: '$5000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 222,
      amount: 500,
      description: '$500 to Michael',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 333,
      amount: 5000,
      description: '$5000 to Jana',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      number: 444,
      amount: 2000,
      description: '$2000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 555,
      amount: 1000,
      description: '$1000 to Jana',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 666,
      amount: 500,
      description: '$2000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number: 667,
      amount: 5000,
      description: null,
      transaction_type: 'charge',
      status: 'confirmed',
      createdAt: new Date('09/22/20'),
      updatedAt: new Date('09/22/20')
    },

    {
      number: 668,
      amount: 2000,
      description: null,
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('10/15/20'),
      updatedAt: new Date('10/15/20')
    },

    {
      number: 669,
      amount: 7000,
      description: null,
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('11/12/20'),
      updatedAt: new Date('11/12/20')
    },

    {
      number: 700,
      amount: 10000,
      description: null,
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('12/23/20'),
      updatedAt: new Date('12/23/20')
    },

    {
      number: 777,
      amount: 10000,
      description: null,
      transaction_type: 'charge',
      status: 'confirmed',
      createdAt: new Date('01/06/21'),
      updatedAt: new Date('01/06/21')
    },

    {
      number: 888,
      amount: 3000,
      description: '$3000 to John',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('01/13/21'),
      updatedAt: new Date('01/13/21')
    },

    {
      number: 999,
      amount: 2000,
      description: '$2000 from Jane',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('01/20/21'),
      updatedAt: new Date('01/20/21')
    },
    {
      number: 9991,
      amount: 5000,
      description: 'charge',
      transaction_type: 'charge',
      status: 'confirmed',
      createdAt: new Date('01/27/21'),
      updatedAt: new Date('01/27/21')
    },
    {
      number: 9992,
      amount: 4000,
      description: '$4000 to Michael',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('02/06/21'),
      updatedAt: new Date('02/06/21')
    },
    {
      number: 9993,
      amount: 2000,
      description: '$2000 from Michael',
      transaction_type: 'transfer',
      status: 'confirmed',
      createdAt: new Date('02/08/21'),
      updatedAt: new Date('02/08/21')
    },
  
  ], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('transactions', null, {});
  }
};
