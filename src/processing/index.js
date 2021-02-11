
import jsonschema from 'jsonschema'

import types from './types'
import { request as UrlRequest } from '../util/request'

import validateData from '../util/validator'
import baseSchema from '../../schema/processingRequest.json'
import profileSchema from '../../schema/profile.json'
import matchSchema from '../../schema/match.json'

import fetch from 'node-fetch'

const schema = Object.freeze({
    
        'profile.json': profileSchema,
        'match.json': matchSchema
    
})

const processing = {
    
    getProcessingTypes: () => {
        return types.PROCESSING_TYPES
    },
    request: async (connection, type, data) => {
        if (!type) {
            throw new Error('request type is required')
        }
        if (!data) {
            throw new Error('no payload found - request parameters required to process data')
        }
        let results = {
            message: 'error requesting processing'
        }
        if(!data.type){
            data.type = type.nme
        }

        if(!await validateData(baseSchema, data))
            return '{ "message" : "the data provided does not meet minimum requirements" }'
    
        let typeSchema = schema[type.schema]
        if(!await validateData(typeSchema, data)){
            let msg = `the data provided does not meet requirements for a  request ${type.name}`
            return `{ "message" : ${msg} }`
        }
        
        console.log('http://staging-api.whiterabbitintel.com/processing')

        let params = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
                "access-key": process.env.WRI_ACCESS_KEY,
                "x-api-key": process.env.WRI_API_KEY
             }
        }

        console.log('params',params)
        let result = await fetch('https://staging-api.whiterabbitintel.com/processing', params)

        return result
        
    },
    getResults: async (connection, type, requestId) => {
        let results = {
            message: 'error requesting processing'
        }

        let requestObj = types.getType(type);

        results = await request(connection, { method: 'GET', id: requestId, endPoint: requestObj.url })

        return results;
    }

}

export default processing
