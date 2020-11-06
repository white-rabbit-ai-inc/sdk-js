
const PROCESSING_TYPES = Object.freeze({
    PROFILE: Symbol('PROFILE'),
    MATCH: Symbol('MATCH')
});

const requests = {};
requests[PROCESSING_TYPES.PROFILE] = {
    url: `/profile`
}
requests[PROCESSING_TYPES.MATCH] = {
    url: `/match`
};

module.exports = {
    PROCESSING_TYPES: PROCESSING_TYPES,
    requests: requests
  };