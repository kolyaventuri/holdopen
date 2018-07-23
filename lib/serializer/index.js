class Serializer {
  constructor(attributeMap) {
    this.attributeMap = attributeMap;
    this.mapKeys = Object.keys(this.attributeMap);
  }

  serialize(object) {
    let serializedObject = {};

    for(let key of this.mapKeys) {
        serializedObject[this.attributeMap[key]] = object[key];
    }

    return serializedObject;
  }
}

module.exports = Serializer;
