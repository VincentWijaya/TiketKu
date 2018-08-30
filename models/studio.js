'use strict';
module.exports = (sequelize, DataTypes) => {
  const Studio = sequelize.define('Studio', {
    movieId: DataTypes.INTEGER
  }, {});
  Studio.associate = function(models) {
    // associations can be defined here
    Studio.belongsTo(models.Movie, {foreignKey: 'movieId'})
    Studio.belongsToMany(models.ShowTime, {through: models.Schedule, foreignKey: 'studioId'})
  };
  return Studio;
};