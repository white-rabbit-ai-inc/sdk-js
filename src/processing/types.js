
const PROCESSING_TYPES = Object.freeze({
    PROFILE: Symbol('PROFILE'),
    MATCH: Symbol('MATCH')
});

const requests = {};
requests[PROCESSING_TYPES.PROFILE] = {
    name: 'profile',
    url: '/processing',
    schema: 'profile.json'
}
requests[PROCESSING_TYPES.MATCH] = {
    name:'match',
    url: '/processing',
    schema: 'match.json'
};

const getType = (type) => {
    return requests[type]
}

module.exports = {
    PROCESSING_TYPES: PROCESSING_TYPES,
    requests: requests,
    getType: getType
  };