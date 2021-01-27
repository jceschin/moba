'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('users', [{
      username: 'soyUsuario',
      name: 'Pepe',
      surname: 'Argento',
      email: 'Pepito@mail.com',
      address: 'calle',
      city: 'ciudad',
      state: 'estado',
      dni: '1234567',
      phone: '12345678',
      birthdate: '12/12/12',
      password: 'super123seguro',
      salt: 'sal',
      account_status: 'registered',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'soyAdmin',
      name: 'Moni',
      surname: 'Argento',
      email: 'Moni@mails.com',
      address: 'calle',
      city: 'ciudad',
      state: 'estado',
      dni: '6541230',
      phone: '87456321',
      birthdate: '11/11/11',
      password: 'super123inseguro',
      salt: 'salGruesa',
      account_status: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
    
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
