
[Back to Overview](README.md)
### Process Data - PROFILE


```javascript
    let type = await wri.processing.getType('PROFILE')

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
        winMapping: "true",
        dataSource: "spreadsheet",
        productService: "product1"
    }

    let returnedUuid = await wri.processing.request(connection, type, payload)
```


### Profile Request Payload

The profile request examines the provided data and provides a look at the overarching theme of the values

```json
    {
       "fileName": "Testing sdk",
        "fileType": "application/json",
        "dataType": "win/loss",
        "processingType": "",   //provided by getType('PROFILE')
        "fileMappings": {
            "firstname": "First Name",
            "lastname": "Last Name",
            "company": "Company Name",
            "win": "Deal Status"
        },
        "winMapping": "true",
        "dataSource": "Empire CRM",
        "productService": "Track and Catch",
        ...
    }
```

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