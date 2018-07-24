const QueryParser = require('../../../app/services/spark/lib/query-parser');

describe('QueryParser', () => {
  describe('.parse', () => {
    it('parses a zip code', () => {
      let result = QueryParser.parse('87114');
      let expected = { zip: '87114' };

      expect(result).to.eql(expected);
    });

    it('treats other things like a partial address', () => {
      let result = QueryParser.parse('other');
      let expected = { address: 'other' };

      expect(result).to.eql(expected);
    });
  });
});
