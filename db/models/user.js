'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(100)
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING(255),
      unique: true
    },
    hashedPass: {
      allowNull: false,
      type: DataTypes.STRING.BINARY
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.HobbyPost, { foreignKey: 'userId' })
    User.hasMany(models.Shaka, {foreignKey: 'userId'})
    User.hasMany(models.Comment, { foreignKey: 'userId' })
    const columnMappingOne = { // User -> User, through Follow as follower
      through: 'Follower',
      otherKey: 'followingId',
      foreignKey: 'followerId',
      as: 'followings'
    }
    const columnMappingTwo = { // User -> User, through Follow as following
      through: 'Follower',
      otherKey: 'followerId',
      foreignKey: 'followingId',
      as: 'followers'
    }
    User.belongsToMany(models.User, columnMappingOne);
    User.belongsToMany(models.User, columnMappingTwo);
  };
  return User;
};
