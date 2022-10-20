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
    },{
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52687395/original/80e8e103-766d-4af9-8658-752d0f2efcb3.jpeg?im_w=1200",
      preview: true
    },{
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-52687395/original/547e8a35-dcdc-4d84-a373-7cb5eda4952f.jpeg?im_w=1200",
      preview: true
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
