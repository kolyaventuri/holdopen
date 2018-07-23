const Serializer = require('../../../lib/serializer');

const attributeMap = {
  'otherFoo': 'foo'
};

const serializer = new Serializer(attributeMap);

describe('Serializer', () => {
  it('can serialize an object', () => {
    const object = {
      foo: 'data',
      bar: 'more data'
    };

    const serialized = serializer.serialize(object);

    expect(serialized).to.not.have.property('foo');
    expect(serialized).to.not.have.property('bar');

    expect(serialized).to.have.property('otherFoo').that.eqls(object.foo);
  });
})
