/**
 * 包含应用所有接口的亲求函数
 */
import ajax from './ajax'
// export function reqLogin(){
//     ajax('/login',{username,password},'POST')
// }



export const reqLogin = (username, password, projectId) => ajax('/login', { username, password, projectId }, 'POST')

export const getApiUriList = (obj) => {
    let url = `/api/list?page=${obj.page}&limit=${obj.limit}`
    if (obj.apiPath || obj.apiPath !== '') {
        url = url + `&apiPath=${obj.apiPath}`
    }
    if (obj.uriMark || obj.apiMark !== '') {
        url = url + `&apiMark=${obj.apiMark}`
    }
    if (obj.device && obj.device !== '0') {
        url = url + `&device=${obj.device}`
    }
    return ajax(url, {}, 'GET');
}

export const getApiData = (id) => ajax(`/api/api?id=${id}`, {}, 'GET')

export const addApiData = (api) => ajax('/api/add', api, 'POST')

export const updateApiData = (api) => ajax('/api/update', api, 'POST')

export const delApiData = (id) => ajax(`/api/del`, id, 'POST')

export const getApiForCaseData = (apiId, userId) => ajax(`/apicase/caseAdd?apiId=${apiId}&userId=${userId}`, {}, 'GET')

export const getApiCaseList = (obj) => {

    let url = `/apicase/list?page=${obj.page}&limit=${obj.limit}`
    if (obj.apiPath || !obj.apiPath === '') {
        url = url + `&apiPath=${obj.apiPath}`
    }
    if (obj.apiCaseMark || !obj.apiCaseMark === '') {
        url = url + `&apiCaseMark=${obj.apiCaseMark}`
    }
    if (obj.device && obj.device !== '0') {
        url = url + `&device=${obj.device}`
    }
    if (obj.apiId && obj.apiId !== 0) {
        url = url + `&apiId=${obj.apiId}`
    }
    if (obj.apiCaseType && obj.apiCaseType !== 0) {
        url = url + `&apiCaseType=${obj.apiCaseType}`
    }


    return ajax(url, {}, 'GET');
}

export const getApiCaseData = (id, userId) => ajax(`/apicase/caseUpdate?id=${id}&userId=${userId}`, {}, 'GET')

export const updateApiCaseData = (apiCaseData) => ajax('/apicase/update', apiCaseData, 'POST')

export const addApiCaseData = (apiCaseData) => ajax('/apicase/add', apiCaseData, 'POST')

export const delApiCaseData = (id, userId) => ajax(`/apicase/del?id=${id}&userId=${userId}`, {}, 'POST')

export const getApiReport = (testIdList) => ajax('/report/list', testIdList, "POST")

export const getApiHomeList = (obj) => ajax(`/report/mainList?page=${obj.page}&limit=${obj.limit}`, {}, "GET")

export const searchTest = (value) => ajax(`/api/searchRely?path=${value}`, {}, 'GET')

export const searchTestName = (value, device) => ajax(`/api/searchRelyName?path=${value}&device=${device}`, {}, 'GET')

export const getApiGroupList = (obj) => {
    let url = `/apigroup/list?page=${obj.page}&limit=${obj.limit}`
    return ajax(url, {}, 'GET')
}
export const putToken = (obj) => ajax("/report/token", obj, "POST")

export const doTest = (obj) => ajax("/report/do", obj, "POST");

export const getOneReport = (id) => ajax(`/report/one?id=${id}`, {}, 'GET')

export const crateDataTire = (value, environment) => ajax(`/createData/tire?orderSn=${value}&environment=${environment}`, {}, 'GET')

export const getReportResultTable = (obj) => ajax("/report/reportList", obj, "POST");

export const getProjectList = () => ajax("/project", {}, "GET");

export const getAccountList = (obj) => ajax('/report/account', obj, 'POST')

export const addApiCaseGroup = (obj) => ajax('/apigroup/add', obj, 'POST')

export const addUpdateGroupData = (id) => ajax(`/apigroup/one?id=${id}`, {}, "GET")

export const updateApiCaseGroup = (obj) => ajax('/apigroup/update', obj, 'POST')

export const delGroup = (id) => ajax(`/apigroup/del?id=${id}`, {}, "GET")

export const getDoGroupData = (id) => ajax(`/apigroup/ready?id=${id}`, {}, "GET")

export const doGroupOne = (obj) => ajax('/apigroup/doOne', obj, 'POST')

export const doHouse = (value) => ajax(`/createData/tire/house?tireId=${value.tireId}&num=${value.num}&environment=${value.environment}`, {}, "GET")

export const completeStoreOrder = (value) => ajax(`/createData/tire/completeStoreOrder?orderSn=${value.orderSn}&environment=${value.environment}&type=${value.type}`, {}, "GET")

export const addGuiData = (obj) => ajax("/gui/add", obj, "POST")

export const getGuiList = () => ajax("/gui/list", {}, "GET")

export const getOneGuiData = (id) => ajax(`/gui/getOne?id=${id}`, {}, "GET")

export const updateGuiData = (obj) => ajax('/gui/update', obj, 'POST')

export const addGuiGroup = (obj) => ajax('/gui/group/add', obj, 'POST')

export const getGuiGroupList = () => ajax('/gui/group/list', {}, 'GET')

export const getGuiGroupOne = (id) => ajax(`/gui/group/one?id=${id}`, {}, 'GET')

export const updateGuiGroupData = (obj) => ajax('/gui/group/update',obj,'POST')

export const getTestCaseNumReport = () => ajax('/home/testCaseReport',{},'GET')
