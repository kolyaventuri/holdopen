const serialize = (object, attributeMap) => {
  let mapKeys = Object.keys(attributeMap);

  let serializedObject = {};

  for(let key of mapKeys) {
    if (typeof attributeMap[key] != 'string') {
      serializedObject[key] = serialize(object[key], attributeMap[key]);
    } else {
      serializedObject[attributeMap[key]] = object[key];
    }
  }

  return serializedObject;
};

class Serializer {
  constructor(attributeMap) {
    this.attributeMap = attributeMap;
    // this.mapKeys = Object.keys(this.attributeMap);
  }

  serialize(object) {
    /* let serializedObject = {};

    for(let key of this.mapKeys) {
      if(typeof this.attributeMap[key] == 'object') {
        let data = object[key];
      }
      serializedObject[this.attributeMap[key]] = object[key];
    }

    return serializedObject; */

    return serialize(object, this.attributeMap);
  }
}

module.exports = Serializer;
