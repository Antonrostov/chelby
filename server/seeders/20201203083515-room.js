module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('room', [
      {
        roomId: 'OZpVji',
        userId1: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        userId2: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        playerOne_status: 'waiting',
        playerTwo_status: 'waiting',
        status: 'full',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'EVlNOh',
        status: 'empty',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'PUBgZS',
        status: 'empty',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        roomId: 'l7jdxj',
        userId1: '97b50d73-f95d-4aa7-8c09-3855d971b87e',
        playerOne_status: 'waiting',
        status: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('room', null, {});
  },
};
