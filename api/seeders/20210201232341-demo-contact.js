'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('contacts', [{
      alias: 'ElPepe',
      contact_username: 'soyUsuario',
      contact_name: 'John',
      contact_surname: 'Doe',
      contact_phone: '12345678',
      contact_email: 'John@mail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Jani',
      contact_username: 'soyAdmin',
      contact_name: 'Jane',
      contact_surname: 'Doe',
      contact_phone: '87456321',
      contact_email: 'Jane@mail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Infiltrado',
      contact_username: 'SuMajestad',
      contact_name: 'Roger',
      contact_surname: 'Federer',
      contact_phone: '33355578',
      contact_email: 'suMajestad@mail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contacts', null, {});
  }
};
