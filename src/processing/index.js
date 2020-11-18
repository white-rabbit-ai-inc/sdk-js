
import types from './types'
import request from '../util/request'

const processing = {
    getProcessingTypes: () => {
        return types.PROCESSING_TYPES
    },
    request: async (connection,type, dataId, data) => {
        if(!type) {
            throw new Error('request type is required')
        }
        if(!dataId && !data){
            throw new Error('data or dataId required to process data')
        }
        let results = {
            message: 'error requesting processing'
        }
        
        let requestObj = types.getType(type);
        
        results = await request(connection, { method: 'POST', endPoint:requestObj.url, dataId: dataId},data)

        return results;
    },
    getResults: async  (connection,type,requestId) => {
        let results = {
            message: 'error requesting processing'
        }
        
        let requestObj = types.getType(type);
        
        results = await request(connection, { method: 'GET', id: requestId, endPoint:requestObj.url})

        return results;
    }

}

export default processing