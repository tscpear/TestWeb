"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjectList = exports.getReportResultTable = exports.crateDataTire = exports.getOneReport = exports.doTest = exports.putToken = exports.getApiGroupList = exports.searchTestName = exports.searchTest = exports.getApiHomeList = exports.getApiReport = exports.delApiCaseData = exports.addApiCaseData = exports.updateApiCaseData = exports.getApiCaseData = exports.getApiCaseList = exports.getApiForCaseData = exports.delApiData = exports.updateApiData = exports.addApiData = exports.getApiData = exports.getApiUriList = exports.reqLogin = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * 包含应用所有接口的亲求函数
 */
// export function reqLogin(){
//     ajax('/login',{username,password},'POST')
// }
var reqLogin = function reqLogin(username, password, projectId) {
  return (0, _ajax["default"])('/login', {
    username: username,
    password: password,
    projectId: projectId
  }, 'POST');
};

exports.reqLogin = reqLogin;

var getApiUriList = function getApiUriList(obj) {
  var url = "/api/list?page=".concat(obj.page, "&limit=").concat(obj.limit);

  if (obj.apiPath || obj.apiPath !== '') {
    url = url + "&apiPath=".concat(obj.apiPath);
  }

  if (obj.uriMark || obj.apiMark !== '') {
    url = url + "&apiMark=".concat(obj.apiMark);
  }

  if (obj.device && obj.device !== '0') {
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

var getApiForCaseData = function getApiForCaseData(apiId, userId) {
  return (0, _ajax["default"])("/apicase/caseAdd?apiId=".concat(apiId, "&userId=").concat(userId), {}, 'GET');
};

exports.getApiForCaseData = getApiForCaseData;

var getApiCaseList = function getApiCaseList(obj) {
  var url = "/apicase/list?page=".concat(obj.page, "&limit=").concat(obj.limit);

  if (obj.apiPath || !obj.apiPath === '') {
    url = url + "&apiPath=".concat(obj.apiPath);
  }

  if (obj.apiCaseMark || !obj.apiCaseMark === '') {
    url = url + "&apiCaseMark=".concat(obj.apiCaseMark);
  }

  if (obj.device && obj.device !== '0') {
    url = url + "&device=".concat(obj.device);
  }

  if (obj.apiId && obj.apiId != 0) {
    url = url + "&apiId=".concat(obj.apiId);
  }

  return (0, _ajax["default"])(url, {}, 'GET');
};

exports.getApiCaseList = getApiCaseList;

var getApiCaseData = function getApiCaseData(id, userId) {
  return (0, _ajax["default"])("/apicase/caseUpdate?id=".concat(id, "&userId=").concat(userId), {}, 'GET');
};

exports.getApiCaseData = getApiCaseData;

var updateApiCaseData = function updateApiCaseData(apiCaseData) {
  return (0, _ajax["default"])('/apicase/update', apiCaseData, 'POST');
};

exports.updateApiCaseData = updateApiCaseData;

var addApiCaseData = function addApiCaseData(apiCaseData) {
  return (0, _ajax["default"])('/apicase/add', apiCaseData, 'POST');
};

exports.addApiCaseData = addApiCaseData;

var delApiCaseData = function delApiCaseData(id, userId) {
  return (0, _ajax["default"])("/apicase/del?id=".concat(id, "&userId=").concat(userId), {}, 'POST');
};

exports.delApiCaseData = delApiCaseData;

var getApiReport = function getApiReport(testIdList) {
  return (0, _ajax["default"])('/report/list', testIdList, "POST");
};

exports.getApiReport = getApiReport;

var getApiHomeList = function getApiHomeList(obj) {
  return (0, _ajax["default"])("/report/mainList?page=".concat(obj.page, "&limit=").concat(obj.limit), {}, "GET");
};

exports.getApiHomeList = getApiHomeList;

var searchTest = function searchTest(value) {
  return (0, _ajax["default"])("/api/searchRely?path=".concat(value), {}, 'GET');
};

exports.searchTest = searchTest;

var searchTestName = function searchTestName(value) {
  return (0, _ajax["default"])("/api/searchRelyName?path=".concat(value), {}, 'GET');
};

exports.searchTestName = searchTestName;

var getApiGroupList = function getApiGroupList(obj) {
  var url = "/apigroup/list?page=".concat(obj.page, "&limit=").concat(obj.limit);
  return (0, _ajax["default"])(url, {}, 'GET');
};

exports.getApiGroupList = getApiGroupList;

var putToken = function putToken(obj) {
  return (0, _ajax["default"])("/report/token", obj, "POST");
};

exports.putToken = putToken;

var doTest = function doTest(obj) {
  return (0, _ajax["default"])("/report/do", obj, "POST");
};

exports.doTest = doTest;

var getOneReport = function getOneReport(id) {
  return (0, _ajax["default"])("/report/one?id=".concat(id), {}, 'GET');
};

exports.getOneReport = getOneReport;

var crateDataTire = function crateDataTire(value, environment) {
  return (0, _ajax["default"])("/createData/tire?orderSn=".concat(value, "&environment=").concat(environment), {}, 'GET');
};

exports.crateDataTire = crateDataTire;

var getReportResultTable = function getReportResultTable(obj) {
  return (0, _ajax["default"])("/report/reportList", obj, "POST");
};

exports.getReportResultTable = getReportResultTable;

var getProjectList = function getProjectList() {
  return (0, _ajax["default"])("/project", {}, "GET");
};

exports.getProjectList = getProjectList;