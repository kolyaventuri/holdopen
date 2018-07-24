const zipRegex = /^\b\d{5}(-\d{4})?\b$/;

class QueryParser {
  static parse(query) {
    let isZip = zipRegex.test(query);
    if(isZip) {
      return { zip: query };
    }

    return { address: query };
  }
}

module.exports = QueryParser;
