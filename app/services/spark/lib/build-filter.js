const filterTypes = {
  'zip': 'PostalCode Eq',
  'minPrice': 'ListPrice Ge',
  'maxPrice': 'ListPrice Le',
  'minBeds': 'BedsTotal Ge',
  'maxBeds': 'BedsTotal Le',
  'minBaths': 'BathsTotal Ge',
  'maxBaths': 'BathsTotal Le',
  'minSqft': 'BuildingAreaTotal Ge',
  'maxSqft': 'BuildingAreaTotal Le'
};

const buildFilter = (params) => {
  let filters = ["PropertyType Eq 'A' Or PropertyType Eq 'C'"];

  let keys = Object.keys(params);

  for(let key of keys) {
    let value = params[key];
    let type = filterTypes[key];
    if(!type) continue;

    if(key == 'zip') value = `'${value}'`;

    filters.push(`${type} ${value}`);
  }

  return filters.join(' And ');
};

module.exports = buildFilter;
