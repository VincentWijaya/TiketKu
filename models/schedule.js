'use strict';
module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    studioId: DataTypes.INTEGER,
    showTimeId: DataTypes.INTEGER
  }, {});
  Schedule.associate = function(models) {
    // associations can be defined here
  };
  return Schedule;
};