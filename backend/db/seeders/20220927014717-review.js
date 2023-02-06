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
      userId: 2 ,
      review: "Great place tucked away - it is a little oasis behind the front house!",
      stars: 5 ,
    },
    {
      spotId: 1 ,
      userId: 3 ,
      review: "Would stay again - really nicely designed and the records were dope",
      stars: 5 ,
    },
    {
      spotId: 1,
      userId:4,
      review: "This is a hidden gem, if no one tells you, you feel transported to another place, the sounds, the calmness, the overall peace felt in the area is unparalell.",
      stars: 5
    },
    {
      spotId: 1,
      userId: 5,
      review: "Great place and location! Very close to the river (you have a river view). ",
      stars: 4,
    },
    {
      spotId: 1,
      userId: 6,
      review: "Hosts were very accommodating and pleasant. Enjoyed our 1 night stay. Nice views of river.",
      stars: 5,
    },
    {
      spotId: 2 ,
      userId: 1 ,
      review: "Truly one of the best experiences staying at your house!",
      stars: 4 ,
    },
    {
      spotId: 2 ,
      userId: 3 ,
      review: "This place is amazing and unique.",
      stars: 5 ,
    },
    {
      spotId: 2,
      userId: 4,
      review: "Amazing, cosy, exactly as shown in pictures and even better. sleeping with the sound of the river is wonderful. Linda and Memo are great, kind and friendly, we will be back to taste their food cause this time was not possible",
      stars: 4,
    },
    {
      spotId: 2,
      userId: 5,
      review: "The house is very cool with a lot of personalized touches. The marble stoned floors and candles everywhere make this house beautiful, especially in the evening. ",
      stars: 5,
    },
    {
      spotId: 3,
      userId: 1,
      review: "I have stayed in many Airbnbs and this one is the best by far. The design is beautiful, many opportunities for nice photos.",
      stars: 5,
    },
    {
      spotId: 3 ,
      userId: 2 ,
      review: "Awesome little place. Great location, easy to access.",
      stars: 5 ,
    },
    {
      spotId: 3,
      userId: 4,
      review:"This place was a dream! Every corner was utterly beautiful and the bed was so comfortable.",
      stars: 4
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
    },
    {
      spotId: 4,
      userId: 5,
      review: "Beautiful, relaxing and wonderful! The best Air BnB I have stayed in. From help picking us up at the airport, giving fresh fruits, coffee and flowers to advice on beaches and tours (that were outstanding), hanging in the plunge pool, air conditioning, great location..",
      stars: 5
    },
    {
      spotId: 5,
      userId: 1,
      review: "I cant say enough about this place it was gorgeous, it looked exactly like the pictures and the walk way thru with the palm leaves was amazing... I loved loved loved the night time view of this place.",
      stars: 4
    },
    {
      spotId: 5,
      userId: 4,
      review: "House is amazing. Everything was perfect.",
      stars: 5
    },
    {
      spotId: 6,
      userId: 5,
      review: "Local beach, beautiful and may be reached by car or bicycle. Relax for the day or go early and watch for whales and dolphins.",
      stars: 5
    },
    {
      spotId: 6,
      userId: 4,
      review: "Best beach on the Central Coast. Only 15 minutes by car.",
      stars: 5
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
