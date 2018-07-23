const Spark = require('../../../app/services/spark');

describe('Spark service', () => {
  it('can build filters', () => {
    params1 = { zip: 87114 };
    params2 = { zip: 87114, minPrice: 1500, };
    params3 = { zip: 87114, minPrice: 1500, maxPrice: 1500 };

    expect(Spark.buildFilter(params1)).to.include(`PostalCode Eq '${params1.zip}'`);
    expect(Spark.buildFilter(params2)).to.include(`PostalCode Eq '${params2.zip}' And ListPrice Ge ${params2.minPrice}`);
    expect(Spark.buildFilter(params3)).to.include(`PostalCode Eq '${params3.zip}' And ListPrice Ge ${params3.minPrice} And ListPrice Le ${params3.maxPrice}`);
  });

  it('can make requests', async () => {
    let result = await Spark.makeRequest('/listings');

    expect(result).to.be.an('object').that.has.property('D');
    expect(result.D.Success).to.be.true;
  });

  it('can search for homes', async () => {
    let listings = await Spark.search();

    expect(result).to.be.an('object').that.has.property('Results').that.is.an('array');
  });
});
