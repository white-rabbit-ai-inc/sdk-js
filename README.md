
# White Rabbit Intel JavaScript SDK

[![NPM version](https://img.shields.io/npm/v/wri-sdk.svg)](https://www.npmjs.com/package/wri-sdk)
[![NPM downloads](https://img.shields.io/npm/dm/wri-sdk.svg)](https://www.npmjs.com/package/wri-sdk)
[![Build Status](https://circleci.com/gh/white-rabbit-ai-inc/sdk-js.svg?style=shield)](https://app.circleci.com/pipelines/github/white-rabbit-ai-inc/sdk-js)

## Version 1.x Now Available
The [version 1.x](https://github.com/white-rabbit-ai-inc/sdk-js) of the WRI JavaScript SDK generally available.
For more information see the [Developer Guide](https://#/)
or [API Reference](https://#).

For future releases, release notes will be available.

<!-- ## Table of Contents:
* [Getting Started](_#Getting-Started_)
* [Getting Help](_#Getting-Help_)
* [Contributing](_#Contributing_) -->

<!-- ## Getting Started -->

## How To Install

### In the Browser

This SDK is not designed for use in a browser. 

### In Node.js

The preferred way to install the AWS SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install wri-sdk
```


In a JavaScript file:

```javascript
// import WRI data uploader 
var data = require('wri-sdk/data'); 

// import WRI connection object
var connection = require('wri-sdk/connection');

// import WRI data processor 
var processing = require('wri-sdk/processing'); 
```

<!-- # Getting Help -->


<!-- # Contributing
We welcome community contributions and pull requests. See [CONTRIBUTING.md](sdk-js/blob/master/CONTRIBUTING.md) for information on how to set up a development environment and submit code. -->

## License

This SDK is distributed under the
[MIT License](https://rem.mit-license.org)

<!-- ### Connection
    
    const connection = connection.init()

### Data

async function upload
    
    data.upload(connection, { contentType: contentType, contentLength: fileSizeInBytes }, file)


### Processing

async function getTypes
```javascript

await getTypes()

```

async function getType
```javascript

await processing.getType('PROFILE')

``` -->