'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudioSeat = sequelize.define('StudioSeat', {
    scheduleId: DataTypes.INTEGER,
    seatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    avail: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: (seats, options) => {
        seats.avail = true
      }
    }
  });
  StudioSeat.associate = function(models) {
    // associations can be defined here
    StudioSeat.belongsTo(models.Seats, {foreignKey: 'seatId'})
    StudioSeat.belongsTo(models.User, {foreignKey: 'userId'})
    StudioSeat.belongsTo(models.Schedule, {foreignKey: 'scheduleId'})
  };
  return StudioSeat;
};