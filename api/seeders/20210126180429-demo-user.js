'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('users', [{
      username: 'soyUsuario',
      name: 'John',
      surname: 'Doe',
      email: 'John@mail.com',
      address: 'calle',
      city: 'ciudad',
      state: 'estado',
      dni: '1234567',
      phone: '12345678',
      birthdate: '12/12/12',
      password: 'f9e3eda0b9d1f03951d3b70e16617b85454b0a108a12208bb858373105cd4b8a',
      salt: 'sal',
      rol: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'soyAdmin',
      name: 'Jane',
      surname: 'Doe',
      email: 'Jane@mails.com',
      address: 'calle',
      city: 'ciudad',
      state: 'estado',
      dni: '6541230',
      phone: '87456321',
      birthdate: '11/11/11',
      password: 'super123inseguro',
      salt: 'salGruesa',
      rol: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'MichaelDoe',
      name: 'Michael',
      surname: 'Doe',
      email: 'michael@mails.com',
      address: 'calle',
      city: 'ciudad',
      state: 'estado',
      dni: '6511230',
      phone: '874556321',
      birthdate: '11/11/11',
      password: 'super123inseguro',
      salt: 'asd',
      rol: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {});
    
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
