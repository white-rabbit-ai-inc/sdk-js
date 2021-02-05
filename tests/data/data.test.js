import fs from 'fs'
import data from '../../src/data'
import config from '../../src/config'

fetch.dontMock() 
fetch.disableMocks()

// import { ENVIRONMENT_TYPES } from '../../src/config'
describe('testing data upload', () => {

    let env = process.env;
    beforeEach(() => {
        env.WRI_ACCESS_KEY = '28b8c9dfa13b58455fa383a42503f4defadc2ab7bf3a90be7a1147389c3ab1f7'
        env.WRI_API_KEY = 'FMd9MofcZN7ZOJhlDNTGc1PRVzFRscDI7uzkpiQs' ;
      });
    test('test upload', async () => {
        let contentType = 'application/json'
        
        const connection = config.init({ apiKey: '1234' })
        connection.setEnvironment(config.ENVIRONMENT_TYPES.STAGING)
    
        const stats = fs.statSync('lib/test.json' );
        const fileSizeInBytes = stats.size;
        const file =  fs.readFileSync('lib/test.json' );
        // let readStream = fs.createReadStream('lib/test.json');
        
        let result = await data.upload(connection, { contentType: contentType, contentLength: fileSizeInBytes}, file)
        console.log('result',result)
    })
})
