const crypto = require('crypto');

const SignatureGenerator = require('../../../app/services/spark/lib/generate-signature');
let { generateSignature } = new SignatureGenerator('secret', 'key', 'token');

describe('Spark signature generator', () => {
  it('generates valid signatures', () => {

    let result = generateSignature('/endpoint', { param: 1 });

    let expected = 'secretApiKeykeyServicePath/v1/endpointAuthTokentokenparam1';
    expected = crypto.createHash('md5').update(expected).digest('hex');

    expect(result).to.be.a('string').that.eqls(expected);
  });
});
