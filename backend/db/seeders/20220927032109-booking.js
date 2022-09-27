'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1 ,
        userId: 1 ,
        startDate: new Date("2022-12-01") ,
        endDate: new Date("2022-12-03") ,
      },
      {
        spotId: 1 ,
        userId: 2 ,
        startDate: new Date("2022-12-11") ,
        endDate: new Date("2022-12-13") ,
      },
      {
        spotId: 2 ,
        userId: 3 ,
        startDate: new Date("2022-12-10") ,
        endDate: new Date("2022-12-12") ,
      },
      {
        spotId: 3 ,
        userId: 2 ,
        startDate: new Date("2022-12-16") ,
        endDate: new Date("2022-12-18") ,
      },
      {
        spotId: 4 ,
        userId: 3 ,
        startDate: new Date("2022-12-23") ,
        endDate: new Date("2022-12-25") ,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Bookings", null, {})
  }
};
