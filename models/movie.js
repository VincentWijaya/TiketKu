'use strict';
module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Film title already exist!'
      }
    },
    urlImg: DataTypes.TEXT
  }, {});
  Movie.associate = function(models) {
    // associations can be defined here
  };
  return Movie;
};