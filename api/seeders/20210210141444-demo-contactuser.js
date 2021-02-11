'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('contactusers', [{
      iscontact_ofuser: 111,
      contact_id: 2,
      contact_userid: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 112,    
      contact_id: 1,
      contact_userid: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 113,
      contact_id: 4,
      contact_userid: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 114,
      contact_id: 3,
      contact_userid: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 115, 
      contact_id: 6,
      contact_userid: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 116,  
      contact_id: 5,
      contact_userid: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 117,  
      contact_id: 8,
      contact_userid: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 118,  
      contact_id: 7,
      contact_userid: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 119, 
      contact_id: 10,
      contact_userid: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      iscontact_ofuser: 120,      
      contact_id: 9,
      contact_userid: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contactusers', null, {});
  }
};
