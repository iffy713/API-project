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
   await queryInterface.bulkInsert('Reviews', [
    {
      spotId: 1 ,
      userId: 1 ,
      review: "Great place tucked away - it’s a little oasis behind the front house!",
      stars: 5 ,
    },
    {
      spotId: 1 ,
      userId: 2 ,
      review: "Would stay again - really nicely designed and the records were dope",
      stars: 5 ,
    },
    {
      spotId: 2 ,
      userId: 1 ,
      review: "Truly one of the best experiences staying at your house!",
      stars: 4 ,
    },
    {
      spotId: 2 ,
      userId: 2 ,
      review: "This place is amazing and unique.",
      stars: 5 ,
    },
    {
      spotId: 3 ,
      userId: 1 ,
      review: "Awesome little place. Great location, easy to access.",
      stars: 5 ,
    },
    {
      spotId: 4,
      userId: 3,
      review: "The house is so elegantly designed and unique and the space is gorgeous and so tranquil.",
      stars: 5
    },
    {
      spotId: 4,
      userId: 1,
      review: "Amazing property! The neighborhood was quiet as promised and the space is beautiful.",
      stars: 4
    }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
