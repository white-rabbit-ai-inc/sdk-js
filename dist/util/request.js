"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const request = async (connection, params, data) => {
  if (params.method === undefined) throw new Error('no method defined');
  params.method = params.method.toLowerCase();
  let isFile = !!params.file;
  let isDataPost = params.method === 'post' && !isFile;
  let url = `${connection.environment.url}${params.endPoint}`;
  let options = {
    method: params.method.toUpperCase()
  };

  if (params.method === 'get' && params.id) {
    url += `/${params.id}`;
  }

  if (params.method === 'get' && params.queries) {
    for (const [key, value] of Object.entries(params.queries)) {
      url += url.includes('?') ? `&` : `?`;
      url += `${key}=${value}`;
    }

    ;
  }

  if (isDataPost) {
    options.body = JSON.stringify(data);
  }

  if (isFile) {
    options.body = data;
    options.headers = {
      "Content-length": params.contentLength
    };
  }

  options.headers = {
    "access-key": process.env.WRI_ACCESS_KEY,
    "x-api-key": process.env.WRI_API_KEY
  };
  let result = await (0, _nodeFetch.default)(url, options); // console.log(result)
  // if(result.status !== 200){
  //     console.error(result)
  // }

  return result;
};

exports.request = request;