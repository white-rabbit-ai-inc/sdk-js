
const types = {
  PROFILE: {
    name: 'profile',
    url: '/processing',
    schema: 'profile.json'
  },
  MATCH: {
    name: 'match',
    url: '/processing',
    schema: 'match.json'
  }
}

const getType = async (type) => {
  const keys = Object.keys(types)
  if (!keys.includes(type)) {
    throw new Error('Invalid Processing Type')
  }
  return types[type]


module.exports = {
  types: types,
  getType: getType
}
