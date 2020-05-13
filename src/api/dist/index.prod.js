"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getOneReport=exports.doTest=exports.putToken=exports.getApiGroupList=exports.searchTestName=exports.searchTest=exports.getApiHomeList=exports.getApiReport=exports.delApiCaseData=exports.addApiCaseData=exports.updateApiCaseData=exports.getApiCaseData=exports.getApiCaseList=exports.getApiForCaseData=exports.delApiData=exports.updateApiData=exports.addApiData=exports.getApiData=exports.getApiUriList=exports.reqLogin=void 0;var _ajax=_interopRequireDefault(require("./ajax"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var reqLogin=function(a,t){return(0,_ajax.default)("/login",{username:a,password:t},"POST")};exports.reqLogin=reqLogin;var getApiUriList=function(a){var t="/api/list?page=".concat(a.page,"&limit=").concat(a.limit);return!a.apiPath&&""===a.apiPath||(t+="&apiPath=".concat(a.apiPath)),!a.uriMark&&""===a.apiMark||(t+="&apiMark=".concat(a.apiMark)),a.device&&"0"!==a.device&&(t+="&device=".concat(a.device)),(0,_ajax.default)(t,{},"GET")};exports.getApiUriList=getApiUriList;var getApiData=function(a){return(0,_ajax.default)("/api/api?id=".concat(a),{},"GET")};exports.getApiData=getApiData;var addApiData=function(a){return(0,_ajax.default)("/api/add",a,"POST")};exports.addApiData=addApiData;var updateApiData=function(a){return(0,_ajax.default)("/api/update",a,"POST")};exports.updateApiData=updateApiData;var delApiData=function(a){return(0,_ajax.default)("/api/del",a,"POST")};exports.delApiData=delApiData;var getApiForCaseData=function(a,t){return(0,_ajax.default)("/apicase/caseAdd?apiId=".concat(a,"&userId=").concat(t),{},"GET")};exports.getApiForCaseData=getApiForCaseData;var getApiCaseList=function(a){var t="/apicase/list?page=".concat(a.page,"&limit=").concat(a.limit);return!a.apiPath&&""!==!a.apiPath||(t+="&apiPath=".concat(a.apiPath)),!a.apiCaseMark&&""!==!a.apiCaseMark||(t+="&apiCaseMark=".concat(a.apiCaseMark)),a.device&&"0"!==a.device&&(t+="&device=".concat(a.device)),a.apiId&&0!=a.apiId&&(t+="&apiId=".concat(a.apiId)),(0,_ajax.default)(t,{},"GET")};exports.getApiCaseList=getApiCaseList;var getApiCaseData=function(a,t){return(0,_ajax.default)("/apicase/caseUpdate?id=".concat(a,"&userId=").concat(t),{},"GET")};exports.getApiCaseData=getApiCaseData;var updateApiCaseData=function(a){return(0,_ajax.default)("/apicase/update",a,"POST")};exports.updateApiCaseData=updateApiCaseData;var addApiCaseData=function(a){return(0,_ajax.default)("/apicase/add",a,"POST")};exports.addApiCaseData=addApiCaseData;var delApiCaseData=function(a,t){return(0,_ajax.default)("/apicase/del?id=".concat(a,"&userId=").concat(t),{},"POST")};exports.delApiCaseData=delApiCaseData;var getApiReport=function(a){return(0,_ajax.default)("/report/list",a,"POST")};exports.getApiReport=getApiReport;var getApiHomeList=function(a){return(0,_ajax.default)("/report/mainList?page=".concat(a.page,"&limit=").concat(a.limit),{},"GET")};exports.getApiHomeList=getApiHomeList;var searchTest=function(a){return(0,_ajax.default)("/api/searchRely?path=".concat(a),{},"GET")};exports.searchTest=searchTest;var searchTestName=function(a){return(0,_ajax.default)("/api/searchRelyName?path=".concat(a),{},"GET")};exports.searchTestName=searchTestName;var getApiGroupList=function(a){var t="/apigroup/list?page=".concat(a.page,"&limit=").concat(a.limit);return(0,_ajax.default)(t,{},"GET")};exports.getApiGroupList=getApiGroupList;var putToken=function(a){return(0,_ajax.default)("/report/token",a,"POST")};exports.putToken=putToken;var doTest=function(a){return(0,_ajax.default)("/report/do",a,"POST")};exports.doTest=doTest;var getOneReport=function(a,t){return(0,_ajax.default)("/report/one?testId=".concat(a,"&reportId=").concat(t),{},"GET")};exports.getOneReport=getOneReport;