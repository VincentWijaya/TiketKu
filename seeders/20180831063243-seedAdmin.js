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
        name: "Vincent Wijaya",
        email "vincent@gmail.com",
        password: "278b32f01399ea5a422a44de45fd23960492b0917714a053a4f91d482524568f",
        role: "admin",
        createdAt: new Date,
        updatedAt: new Date
      }
    ]
    
    return queryInterface.bulkInsert('Users', data, {})
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
