
import types from './types'


const processing = {
    getProcessingTypes: () => {
        return types.PROCESSING_TYPES
    },
    request: (params) => {
        let results = {
            message: 'error requesting processing'
        }
        
        return results;
    }

}

export default processing