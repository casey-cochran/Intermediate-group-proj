'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(50),
      unique: true
    },
    hashedPass: {
      allowNull: false,
      type: DataTypes.STRING(255)
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};