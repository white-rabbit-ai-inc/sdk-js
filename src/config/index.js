
const ENVIRONMENT_TYPES = Object.freeze({
    PRODUCTION: Symbol('PRODUCTION'),
    STAGING: Symbol('STAGING')
});

const requests = {};

requests[ENVIRONMENT_TYPES.PRODUCTION] = {
    url: 'https://api.whiterabbitintel.com'
};

requests[ENVIRONMENT_TYPES.STAGING] = {
    url: 'https://staging-api.whiterabbitintel.com'
};

const config = {
    ENVIRONMENT_TYPES: ENVIRONMENT_TYPES,
    requests: requests,
    environment: requests[ENVIRONMENT_TYPES.STAGING],
    apiKey: undefined,
    
    init: function(params) {
        if(params){
            this.environment = params.environment || requests[ENVIRONMENT_TYPES.STAGING]
            this.apiKey = params.apiKey || undefined
        }
        return this
    }
}

const setKey = function  (key)  {
    this.apiKey = key
}

const setEnvironment = function(env) {
    this.environment = requests[env]
}

config.setKey = setKey
config.setEnvironment = setEnvironment    

export default config