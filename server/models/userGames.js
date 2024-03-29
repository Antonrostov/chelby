import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class userGames extends Model {
    static associate(models) {
      const { userGameHistories, userRoles } = models;
      userGames.hasMany(userGameHistories, { foreignKey: 'userId' });
      userGames.belongsTo(userRoles, { foreignKey: 'roleRank' });
    }
  }
  userGames.init({
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    email: {
      primaryKey: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    roleRank: {
      type: DataTypes.INTEGER,
      defaultValue: 3,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'userGames',
    timestamps: false,
  });
  return userGames;
};
