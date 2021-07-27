const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userGames', [
      {
        userId: 'd423b106-806d-44d6-8a6b-eb07ab9629a5',
        email: 'superadmin@game.com',
        username: 'superadmin',
        password: bcrypt.hashSync('password', salt),
        isAdmin: true,
      },
      {
        userId: '3d0d8eb9-7a48-442f-914d-7ed1445f6bdd',
        email: 'alphagamer@gmail.com',
        username: 'alphagamer1',
        password: bcrypt.hashSync('alphagamer1', salt),
        isAdmin: false,
      }, {
        userId: 'e2042fb4-925e-4ccd-a7c3-9f3a602511e6',
        email: 'betagamer@ymail.com',
        username: 'betagamer1',
        password: bcrypt.hashSync('betagamer1', salt),
        isAdmin: false,
      }, {
        userId: '95cf7a67-7738-45af-b207-3a0542aa3f3f',
        email: 'charliegamer@live.com',
        username: 'charliegamer1',
        password: bcrypt.hashSync('charliegamer1', salt),
        isAdmin: false,
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userGames', null, {});
  },
};
