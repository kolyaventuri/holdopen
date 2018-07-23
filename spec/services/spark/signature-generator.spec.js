const crypto = require('crypto');

const SignatureGenerator = require('../../../app/services/spark/lib/signature-generator');
let generator = new SignatureGenerator('key', 'secret');

describe('Spark signature generator', () => {
  it('generates valid signatures', () => {

    let result = generator.generateSignature('/endpoint', { param: 1 }, 'token');

    let expected = 'secretApiKeykeyServicePath/v1/endpointAuthTokentokenparam1';
    expected = crypto.createHash('md5').update(expected).digest('hex');

    expect(result).to.be.a('string').that.eqls(expected);
  });
});
