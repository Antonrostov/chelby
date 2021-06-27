module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('room', [
      {
        roomId: '19ed68b5-f862-45f2-8585-c5428d7b6a60',
        userId1: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        userId2: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        playerOne_status: 'waiting',
        playerTwo_status: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'dacc6eed-6866-4ba7-a7c6-92e1252e5b97',
        userId1: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        userId2: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        playerOne_status: 'playing',
        playerTwo_status: 'playing',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: '8c734732-9e6e-4c3b-a789-70f337a26b44',
        userId1: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        userId2: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        playerOne_status: 'ended',
        playerTwo_status: 'ended',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'c8335488-283f-4e26-9e57-6612905f6365',
        userId1: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        userId2: '95cf7a67-7738-45af-b207-3a0542aa3f3f',
        playerOne_status: 'waiting',
        playerTwo_status: 'ended',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room', null, {});
  },
};
