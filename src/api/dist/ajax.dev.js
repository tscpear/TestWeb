"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var _axios = _interopRequireDefault(require("axios"));

var _antd = require("antd");

var _storageUtils = _interopRequireDefault(require("../utils/storageUtils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 能发送异步ajax请求的异步模块
 * 封装axios库
 * 函数的返回值promise对象
 */
function ajax(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 ? arguments[2] : undefined;
  return new Promise(function (resolve, reject) {
    var promise;

    var projectId = _storageUtils["default"].getProjectId(); //执行异步ajax请求
    // if (type === 'GET') {
    //     promise = axios.get(url, {
    //         params: data
    //     ,headers:{'projectId':projectId}
    // })
    // } else {
    //     promise = axios.post(url, {
    //         data: data,
    //         headers:{'projectId':projectId}
    // })
    // }


    promise = (0, _axios["default"])({
      method: type,
      url: url,
      data: data,
      headers: {
        'projectId': projectId
      }
    }); //如果成功了，调用resolve（value）

    promise.then(function (response) {
      resolve(response);
    })["catch"](function (error) {
      _antd.message.error('请求出错了：' + error.message);
    }); //如果时报调用，不调用reject，提示异常信息
  });
}