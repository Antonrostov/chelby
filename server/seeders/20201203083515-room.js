module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('room', [
      {
        roomId: 'OZpVji',
        userId1: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        userId2: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        playerOne_status: 'waiting',
        playerTwo_status: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'EVlNOh',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'PUBgZS',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'l7jdxj',
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
