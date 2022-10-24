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
    // spot 1
    {
      spotId:1,
      url: "https://a0.muscache.com/im/pictures/2c6144b5-102b-4482-84a3-70026426a789.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/e7c3b5ae-1d81-4678-a8f5-740df98ddb21.jpg?im_w=720",
      preview: false
    },
    {
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/15ede273-06dd-4f3d-8571-8288ef82a540.jpg?im_w=720",
      preview: false
    },{
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/db5fb9d6-0b70-43b4-95b3-2990f45c2d3e.jpg?im_w=720",
      preview: false
    },{
      spotId: 1,
      url: "https://a0.muscache.com/im/pictures/653e6ae6-9039-4cef-b52b-2b84a1bff740.jpg?im_w=720",
      preview: false
    },
    // spot 2
    {
      spotId: 2,
      url: "https://a0.muscache.com/im/pictures/b30b61e5-fad2-4363-931b-b52823a2705b.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/d4b20c75-241e-4147-ba2e-67552d84918d.jpg?im_w=720",
      preview: false
    },{
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/929f3edb-a235-47b1-96f9-6f28cb7ef70a.jpg?im_w=720",
      preview: false
    },{
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/d6c6da13-baf1-4708-8669-9f3e57123dce.jpg?im_w=720",
      preview: false
    },{
      spotId:2,
      url: "https://a0.muscache.com/im/pictures/da0616ed-bcbc-4626-b794-68dccf531c8a.jpg?im_w=720",
      preview: false
    },
    //spot 3
    {
      spotId: 3,
      url: "https://a0.muscache.com/im/pictures/e25a9b25-fa98-4160-bfd1-039287bf38b6.jpg?im_w=960",
      preview: true,
    },
    {
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/f4f7b242-db33-46fc-9080-c3d6a6fd55ec.jpeg?im_w=720",
      preview:false
    },{
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/36d8007a-0de5-439d-9fec-1c2d7b53a147.jpeg?im_w=720",
      preview:false
    },{
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/97108083-280f-4e0e-9f1b-7a4b0dd34c44.jpeg?im_w=720",
      preview:false
    },{
      spotId:3,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-34113796/original/bc14c173-1c04-4ffa-bdb1-4bd9c055e71d.jpeg?im_w=1200",
      preview:false
    },
    //spot 4
    {
      spotId: 4,
      url: "https://a0.muscache.com/im/pictures/444a8225-e657-4d62-97db-42f7423ae890.jpg?im_w=1200",
      preview: true,
    },
    {
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/78fb8268-b999-4389-b072-e2a66910e41b.jpg?im_w=720",
      preview: false
    },{
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/45f20fc7-9a56-4ef0-b482-79abfb2ddf7e.jpg?im_w=1200",
      preview: false
    },{
      spotId:4,
      url: "https://a0.muscache.com/im/pictures/fa69ad41-88c2-44cb-b1d6-edc7605c8444.jpg?im_w=720",
      preview: false
    },{
      spotId:4,
      url:  "https://a0.muscache.com/im/pictures/c8f44224-5fc3-4860-80d1-cd69371c7ffc.jpg?im_w=1200",
      preview: false
    },
    //spot 5
    {
      spotId: 5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/2d811bfc-9e1b-41ae-8156-c1df534191ed.jpeg?im_w=960",
      preview: true
    },
    {
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/f83138c8-57fa-4c64-8381-04de7bcdaa23.jpeg?im_w=720",
      preview: false
    },{
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/a8c5e509-56c8-41e1-b297-0c2641876e41.jpeg?im_w=1200" ,
      preview: false
    },{
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/miso/Hosting-40012920/original/30b677f6-9c66-4774-8a45-3a0c9eca8b4c.jpeg?im_w=720",
      preview: false
    },{
      spotId:5,
      url: "https://a0.muscache.com/im/pictures/aa94a4f8-d5da-466d-9c59-e4498bcc4a5d.jpg?im_w=720",
      preview: false
    },
    //spot 6
    {
      spotId: 6,
      url: "https://a0.muscache.com/im/pictures/3311eab5-05b4-4628-9c70-12b0dda9f40a.jpg?im_w=1200",
      preview: true
    },{
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/aa289895-6bee-4e6e-99b3-050dd7c08a1a.jpg?im_w=720",
      preview: false
    },{
      spotId:6,
      url:  "https://a0.muscache.com/im/pictures/9ec1ebdd-dece-462e-9fea-7f060a3c565e.jpg?im_w=1200",
      preview: false
    },{
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/7de4c326-5f40-4e6e-a1f6-1453daba0e8f.jpg?im_w=720",
      preview: false
    },{
      spotId:6,
      url: "https://a0.muscache.com/im/pictures/61739ce2-45c1-412b-81b9-f5f686a4f2db.jpg?im_w=1200",
      preview: false
    },
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
