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
   await queryInterface.bulkInsert('Spots',[
    {
      ownerId: 1,
      address: "24063 Dunlap Rd.",
      city: "Rockbridge",
      state: "OH",
      country: "USA",
      lat: 39.507290,
      lng: -82.578620,
      name: "Dunlap Hollow A-Frame",
      description: "The Dunlap Hollow A-Frame is a new build that will be completed in mid-March 2021. The A-Frame sleeps up to 10 guests with 3 bedrooms and a picturesque loft filled with windows that sleeps 4.",
      price: 385.99
    },
    {
      ownerId: 2,
      address: "1936 Pinehurst Dr",
      city:"Nashville",
      state: "TN",
      country: "USA",
      lat: 28.003360,
      lng: -82.756340,
      name: "Southern Hospitality In Spades",
      description: "The space has 2 great beds! One is a queen mattress, the other a king. A large fenced yard along with crate are available for your pets use.",
      price: 249.99
    },
    {
      ownerId: 3,
      address: "2600 E 18th St",
      city: "Austin",
      state: "TX",
      country: "USA",
      lat:30.279780,
      lng: -97.714080,
      name: "East Side Beehive",
      description: "Clean, Zen modern backyard cottage, easy access to SXSW, convention center, great dining, and public transportation.",
      price: 214.99
    },
    {
      ownerId: 4,
      address: "23731 MO-413",
      city: "Reeds Spring",
      state: "MS",
      country: "USA",
      lat: 36.713120,
      lng: -93.375110,
      name: "Forest Garden Yurts",
      description: "Glamping at its finest! Forest Garden Yurts are wooden yurts designed and built by Bill Coperthwaite in the 1970s for Tom Hess and Lory Brown as home and pottery studio.",
      price: 119.99
    },
    {
      ownerId: 1,
      address: "20300 W Country Club",
      city: "Aventura",
      state: "FL",
      country: "USA",
      lat: 22.713120,
      lng: -80.375110,
      name: "The Sea Ranch",
      description: "This cozy three-level home is set in coastal forestlands beneath towering redwoods in the historic south end of The Sea Ranch with no adjacent neighbors in sight.",
      price: 129.99
    },
    {
      ownerId: 1,
      address: "980 Ives Dairy Rd",
      city:"Miami",
      state: "FL",
      country: "USA",
      lat: 25.003580,
      lng: -81.725340,
      name: "Miami's Iconic Case Study House",
      description: "Of the few remaining Case Study Houses, it is the only one  available for vacation rental, a true classic of California Case Study House program. ",
      price: 159.99
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
    await queryInterface.bulkDelete('Spots',null, {})
  }
};
