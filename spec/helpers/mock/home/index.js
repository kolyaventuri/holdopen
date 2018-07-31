const template = require('./template');
const faker = require('faker');


class MockHome {
  static raw() {
    return template;
  }

  static random() {
    let home = Object.assign({}, template);

    home.StandardFields.City = faker.address.city();
    home.StandardFields.CountyOrParish = faker.address.county();

    home.StandardFields.ListAgentName = faker.fake('{{name.firstName}} {{name.lastName}}');

    home.StandardFields.ListingId = faker.random.number();
    home.StandardFields.MlsId = faker.random.number().toString();

    home.StandardFields.UnparsedFirstLineAddress = faker.address.streetAddress();
    home.StandardFields.UnparsedAddress = `${home.StandardFields.UnparsedFirstLineAddress}, ${home.StandardFields.City}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;

    return home;
  }
}

module.exports = MockHome;
