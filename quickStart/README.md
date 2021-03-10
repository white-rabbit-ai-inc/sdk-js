
# Getting Started with White Rabbit's SDK
## Set Your Keys

In order to access the WRI system, you need to have two two keys set on the **_NodeJS_** environment
* WRI_API_KEY
* WRI_ACCESS_KEY

## How To Install

### In the Browser

This SDK is not designed for use in a browser. 

### In Node.js

The preferred way to install the AWS SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install wri-sdk -save
```


## Import 

```javascript
import wri from 'wri-sdk'
```

## Get Connection Object
```javascript
let connection = wri.connection.init()
```

## Upload Data

To upload data, pass a conenction object, a parameters object and the file as a stream, stringContent or bufferContent 

```javascript

let contentType = 'application/json'
const stats = fs.statSync('myfile.json');
const fileSizeInBytes = stats.size;
const file = fs.readFileSync('myfile.json');

let params = { contentType: contentType, contentLength: fileSizeInBytes }

let uuid = await wri.data.upload(connection, params, file)
```

## Type Objects
Type objects are descriptors for the types of data processing available via the sdk in the current WRI system 

You can obtain a list of types using getTypes()
```javascript
let types = await wri.processing.getTypes()
```

You can get a specific type by calling getType(typeNameHere)
```javascript
let type = await wri.processing.getType('PROFILE')
```


## Process Data

To process data, pass a conenction object, a type object, and the data to help the system understand your data

```javascript
    let type = await wri.processing.getType('PROFILE')

    let payload = {
        ...
    }

    let returnedUuid = await wri.processing.request(connection, type, payload)
```

### Processing Types

You can find specific information on the request types below
* [PROFILE](profile.md) 
* [MATCH](match.md) 





