import fs from 'fs'
import { data , config, processing } from '../../src'

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

        const connection = config.init()
        connection.setEnvironment(config.ENVIRONMENT_TYPES.STAGING)

        const stats = fs.statSync('lib/test.json');
        const fileSizeInBytes = stats.size;
        const file = fs.readFileSync('lib/test.json');

        let result = await data.upload(connection, { contentType: contentType, contentLength: fileSizeInBytes }, file)
        console.log('result', result)

        let url = new URL(result.url)
        console.log('url',url.pathname.replace('/uploads/',''))

        let uuid = url.pathname.replace('/uploads/','')

        let type = await processing.getType('PROFILE')
        
        let payload = {
            fileUuid: uuid,
            fileName: 'Testing sdk',
            fileType: 'application/json',
            dataType: 'win/loss',
            processingType: type.name,
            fileMappings: { 
                firstname: "firstname",
                lastname: "lastname",
                company: "company",
                win: "win"
            },
            winMapping:"true",
            dataSource:"spreadsheet",
            productService: "product1"
        }
        console.log(payload)
        let processingResult = await processing.request(connection,type, payload )
        console.log(processingResult)
    })
})
