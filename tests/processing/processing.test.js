import fs from 'fs'
import data from '../../src/data'
import config from '../../src/config'

import processing from '../../src/processing'
import types from '../../src/processing/types'


fetch.dontMock()
fetch.disableMocks()

describe('integration testing processing request', () => {
    let env = process.env;
    beforeEach(() => {
        env.WRI_ACCESS_KEY = '28b8c9dfa13b58455fa383a42503f4defadc2ab7bf3a90be7a1147389c3ab1f7'
        env.WRI_API_KEY = 'FMd9MofcZN7ZOJhlDNTGc1PRVzFRscDI7uzkpiQs';
    });

    test('test upload', async () => {
        let contentType = 'application/json'

        const connection = config.init({ apiKey: '1234' })
        connection.setEnvironment(config.ENVIRONMENT_TYPES.STAGING)

        const stats = fs.statSync('lib/test.json');
        const fileSizeInBytes = stats.size;
        const file = fs.readFileSync('lib/test.json');
        // let readStream = fs.createReadStream('lib/test.json');

        let result = await data.upload(connection, { contentType: contentType, contentLength: fileSizeInBytes }, file)
        console.log('result', result)

        let url = new URL(result.url)
        console.log('url',url.pathname.replace('/uploads/',''))

        let uuid = url.pathname.replace('/uploads/','')

        let type = types.getType(types.PROCESSING_TYPES.PROFILE)
        let base = {
            fileUuid: uuid,
            fileName: 'Testing sdk',
            fileType: 'application/json',
            dataType: 'win/loss',
            processingType: type.name
        }
        let profileData = {
            fileMappings: { 
                firstname: "firstname",
                lastname: "lastname",
                company: "company",
                win: "win"
            },
            winMapping:"true",
            dataSource:"spreadsheet",
            productService: "TiR"
        }
        let payload = {...base, ...profileData}
        console.log(payload)
        let processingResult = await processing.request(connection,type, payload )
        console.log(processingResult)
    })
})
