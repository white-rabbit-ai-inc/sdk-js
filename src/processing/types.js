

const types = {};
types['PROFILE'] = {
    name: 'profile',
    url: '/processing',
    schema: 'profile.json'
}
types['MATCH'] = {
    name:'match',
    url: '/processing',
    schema: 'match.json'
};

const getType = (type) => {
    return types[type]
}

module.exports = {
    types: types,
    getType: getType
  };