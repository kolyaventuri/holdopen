const OpenHome = require('../../app/models/open-home');
const Listing = require('../../app/models/listing');
const User = require('../../app/models/user');
const MockHome = require('../helpers/mock/home');

describe('OpenHome Model', () => {
  before(async () => {
    let listing = await Listing.create(MockHome.random());
    let owner = await User.create(require('../requests/user/login/mock/profile'));
    this.openHomeA = OpenHome.create({
      listing,
      owner,

      startTime: new Date(2018, 1, 1),
      endTime: new Date(2018, 1, 1, 8)
    });

    this.openHomeB = OpenHome.create({
      listing,
      owner,

      startTime: new Date(2018, 1, 1, 9),
      endTime: new Date(2018, 1, 1, 11)
    });

    this.openHomeC = OpenHome.create({
      listing,
      owner,

      startTime: new Date(2018, 1, 2),
      endTime: new Date(2018, 1, 2, 8)
    })
  });

  it('can retrieve open homes based on date', async () => {
    let result = await OpenHome.dateRange(new Date(2018, 1, 1), new Date(2018, 1, 10));

    expect(result).to.be.an('array').with.lengthOf(2);

    expect(result[0]).to.eql(this.openHomeA);
    expect(result[1]).to.eql(this.openHomeB);
  });
});
