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

  it('can be serialized', () => {
    let listing = new Listing({StandardFields: { ListPrice: 1000, ListingId: 20 }});

    let serialized = listing.serialize();

    expect(serialized).to.have.property('ListPrice').that.eqls(1000);
    expect(serialized).to.have.property('MLSId').that.eqls(20);
    expect(serialized).to.not.have.property('StandardFields');
  });
});
