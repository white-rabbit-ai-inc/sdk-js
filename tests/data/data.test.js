import fs from 'fs'
import data from '../../src/data'
import connection from '../../src/connection'

fetch.dontMock() 
fetch.disableMocks()

// import { ENVIRONMENT_TYPES } from '../../src/connection'
describe('testing data upload', () => {

    let env = process.env;
    beforeEach(() => {
        env.WRI_ACCESS_KEY = '28b8c9dfa13b58455fa383a42503f4defadc2ab7bf3a90be7a1147389c3ab1f7'
        env.WRI_API_KEY = 'FMd9MofcZN7ZOJhlDNTGc1PRVzFRscDI7uzkpiQs' ;
      });
    test('test upload', async () => {
        let contentType = 'application/json'
        
        const conn = connection.init({ apiKey: '1234' })
        conn.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)
    
        const stats = fs.statSync('lib/test.json' );
        const fileSizeInBytes = stats.size;
        const file =  fs.readFileSync('lib/test.json' );
        // let readStream = fs.createReadStream('lib/test.json');
        
        let result = await data.upload(conn, { contentType: contentType, contentLength: fileSizeInBytes}, file)
        console.log('result',result)
    })
})
