import { Model } from 'sequelize';
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    static associate(models) {  
    }  
      static createRoom = () => {
        const id = format(crypto.randomBytes(2), 'dec')
        return this.create({
          id,
          roomName: id,
        })
      }
    }
  room.init({
    id: {
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
    playerOne_choice: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['rock', 'paper', 'scissor']],
      },
    },
    playerTwo_choice: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['rock', 'paper', 'scissor']],
      },
    },
    playerOne_status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    playerTwo_status: {
      allowNull: false,
      type: DataTypes.STRING,
    },
 }, {
    sequelize,
    modelName: 'room',
    timestamps: true
  });
  return room;
};
