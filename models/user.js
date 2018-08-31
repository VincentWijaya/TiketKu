'use strict';
const hash = require('../helpers/encrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'Wrong email format!'
        }
      }
      unique: {
        msg: 'Email already exist!'
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [7, 16],
          msg: 'Panjang password min. 7 dan max. 16'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hash.hashPassword(user.password, user.email)
        user.role = 'client'
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};