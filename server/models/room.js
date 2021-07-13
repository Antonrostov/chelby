import { Model } from 'sequelize';
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {
      const { userGames } = models;
      room.belongsTo(userGames, { foreignKey: 'userId1', as: 'userData1' });
      room.belongsTo(userGames, { foreignKey: 'userId2', as: 'userData2' });
    }
  }
  room.init({
    roomId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    userId1: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    userId2: {
      type: DataTypes.UUID,
      validate: {
        isUUID: 4,
        notEmpty: true,
      },
    },
    playerOne_status: {
      type: DataTypes.STRING,
    },
    playerTwo_status: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'room',
    timestamps: true,
  });
  return room;
};
