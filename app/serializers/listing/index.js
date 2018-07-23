const Serializer = require('../../../lib/serializer');

const attributeMap = {
  'ListPrice': 'ListPrice',
  'ListingId': 'MLSId',
  'UparsedAddress': 'Address',
  'UnparsedFirstLineAddress': 'FirstLineAddress',
  'BathsTotal': 'TotalBaths',
  'BedsTotal': 'TotalBeds',
  'GarageSpaces': 'GarageSpaces',
  'LotSizeAcres': 'LotSizeAcres',
  'BuildingAreaTotal': 'Sqft',
  'Photos': [
    {
      'Id': 'Id'
    }
  ]
};

const serializer = new Serializer(attributeMap);

class ListingSerializer {
  static serialize(listing) {
    return serializer.serialize(listing.toObject().StandardFields);
  }
}

module.exports = ListingSerializer;
