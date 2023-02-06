'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Demo',
        lastName: 'Demos'
      },
      {
        email: 'dcoleman.io',
        username: 'dcoleman',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Dalia',
        lastName: 'Coleman'
      },
      {
        email: 'rferguson@user.io',
        username: 'rferguson',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Raymond',
        lastName: 'Ferguson'
      },
      {
        email: 'gjothston@user.io',
        username: 'gjohnston',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Gretchen',
        lastName: 'Johnston'
      },
      {
        email: 'icurry@user.io',
        username: 'icurry',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Ian',
        lastName: 'Curry'
      },
      {
        email: 'csherman@user.io',
        username: 'cSherman5',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Clyde',
        lastName: 'Sherman'
      },
      {
        email: 'jleonard@user.io',
        username: 'jleonard',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Jamie',
        lastName: 'Leonard'
      },
      {
        email: 'ghudson@user.io',
        username: 'ghudson',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Gregory',
        lastName: 'Hudson'
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2','FakeUser3','FakeUser4'] }
    }, {});
  }
};
