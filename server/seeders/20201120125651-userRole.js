module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userRoles', [
      {
        rank: 1,
        role: 'superadmin',
      },
      {
        rank: 2,
        role: 'admin',
      },
      {
        rank: 3,
        role: 'user',
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userRoles', null, {});
  },
};
