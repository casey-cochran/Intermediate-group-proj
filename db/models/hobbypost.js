'use strict';
module.exports = (sequelize, DataTypes) => {
  const HobbyPost = sequelize.define('HobbyPost', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  HobbyPost.associate = function (models) {
    // associations can be defined here
    HobbyPost.belongsTo(models.User, { foreignKey: 'userId' })
    HobbyPost.hasMany(models.Comment, { foreignKey: 'hobbyPostId', onDelete: 'cascade', hooks:true })
    HobbyPost.hasMany(models.Shaka, { foreignKey: 'hobbyPostId', onDelete: 'cascade', hooks:true })
  };
  return HobbyPost;
};
