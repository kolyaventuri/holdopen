const TokenGenerator = require('../../../app/services/spark/lib/token-generator');
let generator = new TokenGenerator(process.env.SPARK_KEY, process.env.SPARK_SECRET);

describe('Spark token generator', () => {
  let token = null;

  it('generates a token', async () => {
    let result = await generator.getToken();

    expect(result).to.be.an('object');

    expect(result).to.have.property('token').that.is.a('string');
    expect(result).to.have.property('expires').that.is.a('date');

    token = result;
  });

  it('does not generate a new token if too early to expire', async () => {
    let result = await generator.getToken();

    expect(result.token).to.eql(token.token);
  });

  it('it generates a new token upon expiry', async () => {
    generator.token.expires -= 1e9;

    let result = await generator.getToken();

    expect(result.token).to.not.eql(token.token);
  });
});
