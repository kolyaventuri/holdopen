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
      'Name': 'Name',
      'Caption': 'Caption',
      'UriThumb': 'UriThumb',
      'Uri640': 'Uri640',
      'Uri2048': 'Uri2048',
      'UriLarge': 'UriLarge'
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
