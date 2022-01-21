'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shaka = sequelize.define('Shaka', {
    hobbyPostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Shaka.associate = function(models) {
    // associations can be defined here
    Shaka.belongsTo(models.User, {foreignKey: 'userId'})
    Shaka.belongsTo(models.HobbyPost, { foreignKey: 'hobbyPostId' })
  };
  return Shaka;
};
