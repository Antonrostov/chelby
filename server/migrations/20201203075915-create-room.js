module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('room', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      userId1: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
      },
      userId2: {
        allowNull: false,
        unique: true,
        type: Sequelize.UUID,
      },
      playerOne_choice: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      playerTwo_choice: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      playerOne_status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      playerTwo_status: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('room');
  }
};
