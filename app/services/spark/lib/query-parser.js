const zipRegex = /^\b\d{5}(-\d{4})?\b$/;

class QueryParser {
  static parse(query) {
    let isZip = zipRegex.test(query);
    if(isZip) {
      return { 'StandardFields.PostalCode': query };
    }

    let regexQuery = new RegExp(`.*${query}.*`, 'gi');
    return { 'StandardFields.UnparsedAddress': regexQuery };
  }
}

module.exports = QueryParser;
