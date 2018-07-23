const TokenGenerator = require('../../../app/services/spark/lib/token-generator');
let generator = new TokenGenerator('secret', 'key');

describe('Spark token generator', () => {
  it('generates a token', async () => {
    let result = await generator.getToken();

    expect(result).to.be.a('string');
  });
});
