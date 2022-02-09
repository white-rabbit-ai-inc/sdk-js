[Back to Overview](README.md)
### Process Data - MATCH

To process a match request, the request is very similar to profile.  

Please note the following changes...

The type **_must_** be MATCH.

```javascript
   let type = await wri.processing.getType('MATCH')
```

The payload **_must_** have a persona uuid.  This uuid is returned from a profile request.

First upload the data to run scoring on (a.k.a the match data).  Keep the returned uuid and provide that to the match processing request as the fileUuid.


referenceFileUuid = persona uuid
fileUuid = match data upload uuid


```javascript
    let payload = {
        ...
        referenceFileUuid: personaUuid,
        ...
    }
```

All together, that looks like the following example...

```javascript
   let type = await wri.processing.getType('MATCH')

    let payload = {
        fileUuid: 'upload file uuid',
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
        winMapping: "true",
        referenceFileUuid: "persona uuid",
        dataSource: "spreadsheet",
        productService: "product1"
    }

    let returnedUuid = await wri.processing.request(connection, type, payload)
```
### Match Request Payload

The match request examines the provided data for similarities with previously supplied data

```json
    {
        "fileName": "Testing sdk",
        "fileType": "application/json",
        "dataType": "win/loss",
        "processingType": "",  //provided by getType('MATCH')
        "fileMappings": {
            "firstname": "Boba",
            "lastname": "Fett",
            "company": "Fett Bounties, Inc",
            "win": "captured"
        },
        "winMapping": "true",
        "referenceFileUuid": personaUuidHere,
        "dataSource": "Empire CRM",
        "productService": "Track and Catch",
        ...
    }
```
The payload **_must_** have a persona/profile uuid in the referenceFileUuid.  To run a match on data that has previously been profiled, the fileUuid should reference the current match data file upload and the referenceFileUuid should be the uuid of the previously [profiled](profile.md) data.

And then one of fileUuid or data **_must_** be supplied.

The fileUuid would references a previously uploaded dataset via the uuid returned by the sdk.

The data property is an array of the actual data you would like to evaluate.


```json
    {
        ...
        "productService": "Track and Catch",
        "fileUuid": "03bdb79a-2f71-11eb-adc1-0242ac120002"
    }
```
**_or_**

```json
    {
       ...
        "productService": "Track and Catch",
        "data": [
            {
                "firstname": "Joe",
                "lastname": "Schmoe",
                "email": "joeschmoe@whiterabbitintel.com",
                "win": "captured",
                "company": "White Rabbit Intel"
            }
        ]
    }
```