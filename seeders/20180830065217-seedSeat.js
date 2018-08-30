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
        name: 'A1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'A4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'B1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'B2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'B3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'B4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'C4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'D1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'D2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'D3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'D4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]
    
    return queryInterface.bulkInsert('Seats', data, {})
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
