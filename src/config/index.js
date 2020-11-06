
const ENVIRONMENT_TYPES = Object.freeze({
    SANDBOX: Symbol('SANDBOX'),
    PRODUCTION: Symbol('PRODUCTION')
});

const requests = {};
requests[ENVIRONMENT_TYPES.SANDBOX] = {
    url: 'integration-api.whiterabbitintel.com'
}
requests[ENVIRONMENT_TYPES.PRODUCTION] = {
    url: 'api.whiterabbitintel.com'
};


const config = {
    ENVIRONMENT_TYPES: ENVIRONMENT_TYPES,
    requests: requests,
    environment: requests[ENVIRONMENT_TYPES.SANDBOX],
    apiKey: undefined,
    
    init: function(params) {
        if(params){
            this.environment = params.environment || requests[ENVIRONMENT_TYPES.SANDBOX]
            this.apiKey = params.apiKey || undefined
        }
        return this
    }
}

const setKey = function  (key)  {
    this.apiKey = key
}

const setEnvironment = function(env) {
    this.environment = env
}

config.setKey = setKey
config.setEnvironment = setEnvironment    

export default config