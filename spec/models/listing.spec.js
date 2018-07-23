const Listing = require('../../app/models/listing');

describe('Listing Model', () => {
  it('should be generically valid', () => {
    let listing = new Listing();

    listing.validate((err) => {
      expect(err).to.not.exist;
    });
  });

  it('should accept arbitrary data', () => {
    let listing = new Listing({foo: 'bar', bar: 'foo', nested: { yes: true } });

    listing.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});
