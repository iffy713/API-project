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
    await queryInterface.bulkInsert('ReviewImages',[
      {
        reviewId: 1 ,
        url: "https://cdn.pixabay.com/photo/2017/08/01/12/43/kitchen-2565105_1280.jpg"
      },
      {
        reviewId: 2 ,
        url: "https://cdn.pixabay.com/photo/2016/01/23/23/52/dining-room-1158266_1280.jpg"
      },
      {
        reviewId: 3 ,
        url: "https://cdn.pixabay.com/photo/2016/11/18/17/46/house-1836070_1280.jpg"
      },
      {
        reviewId: 4 ,
        url: "https://cdn.pixabay.com/photo/2016/08/26/15/06/home-1622401__480.jpg"
      }
    ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages', null, {})
  }
};
