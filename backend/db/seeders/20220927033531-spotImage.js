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
   await queryInterface.bulkInsert('SpotImages', [
    {
      spotId:1,
      url: "https://cdn.pixabay.com/photo/2018/01/25/20/53/lifestyle-3107041_1280.jpg",
      preview: true,
    },
    {
      spotId: 2,
      url: "https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_1280.jpg",
      preview: true,
    },
    {
      spotId: 3,
      url: "https://cdn.pixabay.com/photo/2014/10/16/08/39/bedroom-490779_1280.jpg",
      preview: true,
    },{
      spotId: 4,
      url: "https://cdn.pixabay.com/photo/2018/09/24/15/02/bed-3700115_1280.jpg",
      preview: true,
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
    await queryInterface.bulkDelete('SpotImages', null, {})
  }
};
