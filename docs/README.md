
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

<!-- You can also build a custom browser SDK with your specified set of AWS services.
This can allow you to reduce the SDK's size, specify different API versions of
services, or use AWS services that don't currently support CORS if you are
working in an environment that does not enforce CORS. To get started:

http://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/building-sdk-for-browsers.html

The AWS SDK is also compatible with [browserify](http://browserify.org).

For browser-based web, mobile and hybrid apps, you can use [AWS Amplify Library](https://aws.github.io/aws-amplify/?utm_source=aws-js-sdk&utm_campaign=browser) which extends the AWS SDK and provides an easier and declarative interface. -->

### In Node.js

The preferred way to install the AWS SDK for Node.js is to use the
[npm](http://npmjs.org) package manager for Node.js. Simply type the following
into a terminal window:

```sh
npm install wri-sdk
```

In a JavaScript file:

<!-- // import entire SDK
var wri = require('wri-sdk'); -->

```javascript
// import WRI data uploader 
var data = require('wri-sdk/data'); 

// import WRI connection object
var connection = require('wri-sdk/connection');

// import WRI data processor 
var processing = require('wri-sdk/processing'); 
```

<!-- # Getting Help -->

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