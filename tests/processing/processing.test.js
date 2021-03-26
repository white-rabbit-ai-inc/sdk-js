import fs from 'fs'
import { data, connection, processing } from '../../src'
import os from 'os'


fetch.dontMock()
fetch.disableMocks()

describe('integration testing processing request', () => {
    let env = process.env;
    beforeEach(() => {
        try {
            const homedir = os.homedir();
            let lines = require('fs').readFileSync(`${homedir}/.wri/credentials`, 'utf-8')
                .split('\n')
                .filter(Boolean);

            lines.forEach((line) => {
                let splitVals = line.split('=')
                env[splitVals[0]] = splitVals[1]
            })
        }
        catch (e) {
            console.log(e)
        }

    });

    test('test upload and profile', async () => {
        if (process.env.WRI_ACCESS_KEY) {
            jest.setTimeout(10000)
            let contentType = 'application/json'

            const conn = connection.init()
            conn.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)

            const stats = fs.statSync('lib/test.json');
            const fileSizeInBytes = stats.size;
            const file = fs.readFileSync('lib/test.json');

            let uuid = await data.upload(conn, { contentType: contentType, contentLength: fileSizeInBytes }, file)
            
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
                    win: "status"
                },
                winMapping: "sold",
                dataSource: "spreadsheet",
                productService: "product1"
            }

            let processingResult = await processing.request(conn, type, payload)
            console.log('processingResult', processingResult)
        }
    })

    test('test fetch', async () => {
        let id = "3de32980-aea5-491b-af39-3470f19f3487"
        if (process.env.WRI_ACCESS_KEY) {
            jest.setTimeout(10000)
           
            const conn = connection.init()
            conn.setEnvironment(connection.ENVIRONMENT_TYPES.STAGING)

            let type = await processing.getType('PROFILE')

            let processingResult = await processing.getResults(conn, type, id)
            console.log('processingResult', processingResult)
            return processingResult
        }
    })
})
