module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      roomId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(6),
      },
      userId1: {
        type: Sequelize.UUID,
      },
      userId2: {
        type: Sequelize.UUID,
      },
      playerOne_status: {
        type: Sequelize.STRING,
      },
      playerTwo_status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('room');
  },
};
