import fs from 'fs'
import data from '../../src/data'
import config from '../../src/config'


fetch.dontMock() 
fetch.disableMocks()

// import { ENVIRONMENT_TYPES } from '../../src/config'
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