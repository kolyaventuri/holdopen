const serialize = (object, attributeMap) => {
  let mapKeys = Object.keys(attributeMap);

  let serializedObject = {};

  for(let key of mapKeys) {
    if (typeof attributeMap[key] != 'string') {
      if(!Array.isArray(attributeMap[key])) {
        serializedObject[key] = serialize(object[key], attributeMap[key]);
      } else {
        if(!object[key]) continue;
        serializedObject[key] = object[key].map(item => {
          return serialize(item, attributeMap[key][0]);
        });
      }
    } else {
      serializedObject[attributeMap[key]] = object[key];
    }
  }

  return serializedObject;
};

class Serializer {
  constructor(attributeMap) {
    this.attributeMap = attributeMap;
  }

  serialize(object) {
    return serialize(object, this.attributeMap);
  }
}

module.exports = Serializer;
