'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('contact_user', [{
      user_id: 1,
      contact_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 2,
      contact_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 3,
      contact_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 4,
      contact_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 5,
      contact_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 6,
      contact_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 7,
      contact_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 8,
      contact_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 9,
      contact_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 10,
      contact_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contact_user', null, {});
  }
};
