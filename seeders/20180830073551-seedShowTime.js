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
        time: '12:00',
        createdAt: new Date(),
        updatedAt: new Date
      },
      {
        time: '14:00',
        createdAt: new Date(),
        updatedAt: new Date
      },
      {
        time: '16:00',
        createdAt: new Date(),
        updatedAt: new Date
      },
      {
        time: '18:00',
        createdAt: new Date(),
        updatedAt: new Date
      }
    ]
    
    return queryInterface.bulkInsert('ShowTimes', data, {})
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
