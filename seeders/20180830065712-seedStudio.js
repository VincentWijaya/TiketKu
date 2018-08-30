'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    let data = [
      {
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        createdAt: new Date,
        updatedAt: new Date
      }
    ]
    
    return queryInterface.bulkInsert('Studios', data, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
