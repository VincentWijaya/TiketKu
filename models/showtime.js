'use strict';
module.exports = (sequelize, DataTypes) => {
  const showTime = sequelize.define('ShowTime', {
    time: DataTypes.STRING
  }, {});
  showTime.associate = function(models) {
    // associations can be defined here
    showTime.belongsToMany(models.Studio, {through: models.Schedule, foreignKey: 'showTimeId'})
  };
  return showTime;
};