const Serializer = require('../../../lib/serializer');

describe('Serializer', () => {
  it('can serialize an object', () => {
    const attributeMap = {
      'foo': 'otherFoo'
    };

    const serializer = new Serializer(attributeMap);

    const object = {
      foo: 'data',
      bar: 'more data'
    };

    const serialized = serializer.serialize(object);

    expect(serialized).to.not.have.property('foo');
    expect(serialized).to.not.have.property('bar');

    expect(serialized).to.have.property('otherFoo').that.eqls(object.foo);
  });

  it('can deeply serialize', () => {
    const attributeMap = {
      foo: 'otherFoo',
      abc: {
        foo: 'otherFoo'
      }
    };

    const object = {
      foo: 'data',
      bar: 'more data',
      abc: {
        foo: 'test',
        bar: 'no test'
      }
    };

    const serializer = new Serializer(attributeMap);

    const serialized = serializer.serialize(object);

    expect(serialized).to.not.have.property('foo');
    expect(serialized).to.not.have.property('bar');

    expect(serialized).to.have.property('otherFoo').that.eqls(object.foo);

    expect(serialized).to.have.property('abc').that.is.an('object');
    expect(serialized.abc).to.have.property('otherFoo').that.eqls(object.abc.foo);
    expect(serialized.abc).to.not.have.property('bar');

  });

  it('can deeply serialize arrays', () => {
    const attributeMap = {
      foo: 'otherFoo',
      abc: [
        {
          foo: 'otherFoo'
        }
      ]
    };

    const object = {
      foo: 'data',
      bar: 'more data',
      abc: [
        {
          foo: 'data',
          bar: 'more data'
        },
        {
          foo: 'data',
          bar: 'more data'
        }
      ]
    };

    const serializer = new Serializer(attributeMap);

    const serialized = serializer.serialize(object);

    expect(serialized).to.not.have.property('foo');
    expect(serialized).to.not.have.property('bar');

    expect(serialized).to.have.property('otherFoo').that.eqls(object.foo);

    expect(serialized).to.have.property('abc').that.is.an('array');

    for(let item of serialized.abc) {
      expect(item).to.have.property('otherFoo').that.eqls(object.abc[0].foo);
      expect(item).to.not.have.property('bar');
    }

  });
})
