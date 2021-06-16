module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('room', [
       {
        id: '19ed68b5-f862-45f2-8585-c5428d7b6a60',
        userId1: '',
        userId2: '',
        playerOne_choice: '',
        playerTwo_choice: '',
        playerOne_status: '',
        playerTwo_status: '',
      },
      {
        id: 'dacc6eed-6866-4ba7-a7c6-92e1252e5b97',
        userId1: '',
        userId2: '',
        playerOne_choice: '',
        playerTwo_choice: '',
        playerOne_status: '',
        playerTwo_status: '',
      },
      {
        id: '8c734732-9e6e-4c3b-a789-70f337a26b44',
        userId1: '',
        userId2: '',
        playerOne_choice: '',
        playerTwo_choice: '',
        playerOne_status: '',
        playerTwo_status: '',
      },
      {
        id: 'c8335488-283f-4e26-9e57-6612905f6365',
        userId1: '',
        userId2: '',
        playerOne_choice: '',
        playerTwo_choice: '',
        playerOne_status: '',
        playerTwo_status: '',
      }
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room', null, {});
  }
};
