module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      roomId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      userId1: {
        allowNull: false,
        type: Sequelize.UUID,
      },
      userId2: {
        allowNull: false,
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
