const TokenGenerator = require('../../../app/services/spark/lib/token-generator');
let generator = new TokenGenerator(process.env.SPARK_KEY, process.env.SPARK_SECRET);

describe('Spark token generator', () => {
  it('generates a token', async () => {
    let result = await generator.getToken();

    expect(result).to.be.an('object');
    
    expect(result).to.have.property('token').that.is.a('string');
    expect(result).to.have.property('expires').that.is.a('date');
  });
});
