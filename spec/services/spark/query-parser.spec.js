const QueryParser = require('../../../app/services/spark/lib/query-parser');

describe('QueryParser', () => {
  describe('.parse', () => {
    it('parses a zip code', () => {
      let result = QueryParser.parse('87114');
      let expected = { zip: '87114' };

      expect(result).to.eql(expected);
    });
  });
});
