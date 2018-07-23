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

class ListingSerializer {
  static serialize(listing) {
    return listing;
  }
}

module.exports = ListingSerializer;
