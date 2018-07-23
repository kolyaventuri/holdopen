const Serializer = require('../../../lib/serializer');

const attributeMap = {
  'ListPrice': 'ListPrice',
  'MLSId': 'ListingId',
  'Address': 'UnparsedAddress',
  'FirstLineAddress': 'UnparsedFirstLineAddress',
  'TotalBaths': 'BathsTotal',
  'TotalBeds': 'BedsTotal',
  'GarageSpaces': 'GarageSpaces',
  'LotSize': 'LotSizeAcres',
  'Sqft': 'BuildingAreaTotal'
};

const serializer = new Serializer(attributeMap);

class ListingSerializer {
  static serialize(listing) {
    return serializer.serialize(listing);
  }
}

module.exports = ListingSerializer;
