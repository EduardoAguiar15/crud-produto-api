'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('usuarios', [{
      nome: 'admin',
      email: 'admin@gmail.com',
      senha: "b075703a9b30ddc015c6592c76520562"
    }]);

  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete('usuarios')

  }
};
