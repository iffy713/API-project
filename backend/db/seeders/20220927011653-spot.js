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
      name: "Cozy Alpine cabin in the woods close to Zacatlan",
      description: "Elevated over the Valle de Piedras Encimadas, our chalets give you unparalleled views, giving you a feeling of freedom and intimacy. ",
      price: 385.99
    },
    {
      ownerId: 2,
      address: "1936 Pinehurst Dr",
      city:"Boree",
      state: "Rhone-Alpes",
      country: "France",
      lat: 28.003360,
      lng: -82.756340,
      name: "Thatched cottage surrounded by nature",
      description: "Charming wood and stone thatched cottage nestled on the South slopes of Mont Mézenc, near Gerbier de Jonc (where the source of the Loire river is located), in the Borée district of Ardèche, 8 mins from the ski resort of Les Estables..",
      price: 249.99
    },
    {
      ownerId: 3,
      address: "2600 E 18th St",
      city: "Abiansemal",
      state: "Bali",
      country: "Indonesia",
      lat:30.279780,
      lng: -97.714080,
      name: "Aura House 2bds Eco Bamboo House, Pool, River View",
      description: "Aura house is a beautiful & unique eco bamboo house built on the west bank of the River Ayung facing east to catch sunrise.",
      price: 214.99
    },
    {
      ownerId: 4,
      address: "23731 MO-413",
      city: "EI Nido",
      state: "Mimaropa",
      country: "Philippines",
      lat: 36.713120,
      lng: -93.375110,
      name: "Exclusive & Private Island Resort: Floral Island",
      description: "Glamping at its finest! Forest Garden Yurts are wooden yurts designed and built by Bill Coperthwaite in the 1970s for Tom Hess and Lory Brown as home and pottery studio.",
      price: 119.99
    },
    {
      ownerId: 2,
      address: "20300 W Country Club",
      city: "Tulum",
      state: "Quintana Roo",
      country: "Mexico",
      lat: 22.713120,
      lng: -80.375110,
      name: "Piece-of-Art-Loft between Jungle Trees",
      description: "This is a one of the kind loft: Awaking in soft sunlight between palms and trees and feeling the breeze from the ocean. ",
      price: 599.99
    },
    {
      ownerId: 1,
      address: "105 Shell Rd",
      city:"Halcomulco",
      state: "Veracruz",
      country: "Mexico",
      lat: 25.003580,
      lng: -81.725340,
      name: "NoMamesWey eco-cabin on bioalberca, Jalcomulco",
      description: "Our concept is to offer unique experiences of tranquility and natural beauty to couples. That is why we do not accept children under any exceptions.",
      price: 899.99
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
