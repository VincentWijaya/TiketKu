'use strict';
module.exports = (sequelize, DataTypes) => {
  const Seats = sequelize.define('Seats', {
    name: DataTypes.STRING
  }, {});
  Seats.associate = function(models) {
    // associations can be defined here
  };
  return Seats;
};