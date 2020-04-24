"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApiCaseData = exports.getApiCaseList = exports.addApiCaseData = exports.getApiForCaseData = exports.delApiData = exports.updateApiData = exports.addApiData = exports.getApiData = exports.getApiUriList = exports.reqLogin = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 包含应用所有接口的亲求函数
 */
// export function reqLogin(){
//     ajax('/login',{username,password},'POST')
// }
var reqLogin = function reqLogin(username, password) {
  return (0, _ajax["default"])('/login', {
    username: username,
    password: password
  }, 'POST');
};

exports.reqLogin = reqLogin;

var getApiUriList = function getApiUriList(obj) {
  var url = "/api/list?page=".concat(obj.page, "&limit=").concat(obj.limit);

  if (obj.uriValue || !obj.uriValue === '') {
    url = url + "&apiPath=".concat(obj.apiPath);
  }

  if (obj.uriMark || !obj.uriMark === '') {
    url = url + "&apiMark=".concat(obj.apiMark);
  }

  if (obj.device && !obj.device === '0') {
    url = url + "&device=".concat(obj.device);
  }

  return (0, _ajax["default"])(url, {}, 'GET');
};

exports.getApiUriList = getApiUriList;

var getApiData = function getApiData(id) {
  return (0, _ajax["default"])("/api/api?id=".concat(id), {}, 'GET');
};

exports.getApiData = getApiData;

var addApiData = function addApiData(api) {
  return (0, _ajax["default"])('/api/add', api, 'POST');
};

exports.addApiData = addApiData;

var updateApiData = function updateApiData(api) {
  return (0, _ajax["default"])('/api/update', api, 'POST');
};

exports.updateApiData = updateApiData;

var delApiData = function delApiData(id) {
  return (0, _ajax["default"])("/api/del", id, 'POST');
};

exports.delApiData = delApiData;

var getApiForCaseData = function getApiForCaseData(apiId) {
  return (0, _ajax["default"])("/apicase/caseAdd?apiId=".concat(apiId), {}, 'GET');
};

exports.getApiForCaseData = getApiForCaseData;

var addApiCaseData = function addApiCaseData(apiCaseData) {
  return (0, _ajax["default"])('/apicase/add', apiCaseData, 'POST');
};

exports.addApiCaseData = addApiCaseData;

var getApiCaseList = function getApiCaseList(obj) {
  var url = "/apicase/list?page=".concat(obj.page, "&limit=").concat(obj.limit);

  if (obj.apiPath || !obj.apiPath === '') {
    url = url + "&apiPath=".concat(obj.apiPath);
  }

  if (obj.apiCaseMark || !obj.apiCaseMark === '') {
    url = url + "&apiMark=".concat(obj.apiCaseMark);
  }

  if (obj.device && !obj.device === '0') {
    url = url + "&device=".concat(obj.device);
  }

  return (0, _ajax["default"])(url, {}, 'GET');
};

exports.getApiCaseList = getApiCaseList;

var getApiCaseData = function getApiCaseData(id) {
  return (0, _ajax["default"])("/apicase/caseUpdate?id=".concat(id), {}, 'GET');
};

exports.getApiCaseData = getApiCaseData;