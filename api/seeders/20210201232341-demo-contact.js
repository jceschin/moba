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
    },
    {
      alias: 'Micael',
      contact_username: 'MichaelDoe',
      contact_name: 'Michael',
      contact_surname: 'Doe',
      contact_phone: '874556321',
      contact_email: 'michael@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Juancho',
      contact_username: 'JuanDoe',
      contact_name: 'Juan',
      contact_surname: 'Doe',
      contact_phone: '874556322',
      contact_email: 'juan@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Cami',
      contact_username: 'CamilaDoe',
      contact_name: 'Camila',
      contact_surname: 'Doe',
      contact_phone: '874556323',
      contact_email: 'camila@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Mariii',
      contact_username: 'MarielaDoe',
      contact_name: 'Mariela',
      contact_surname: 'Doe',
      contact_phone: '874556324',
      contact_email: 'mariela@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'ElBarba',
      contact_username: 'LucasDoe',
      contact_name: 'Lucas',
      contact_surname: 'Doe',
      contact_phone: '874556325',
      contact_email: 'elbarba@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'tincho',
      contact_username: 'MartinDoe',
      contact_name: 'Martin',
      contact_surname: 'Doe',
      contact_phone: '874556326',
      contact_email: 'martin@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      alias: 'Leti',
      contact_username: 'LeticiaDoe',
      contact_name: 'Leticia',
      contact_surname: 'Doe',
      contact_phone: '874556327',
      contact_email: 'leticia@mails.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }],
    {}
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contacts', null, {});
  }
};
