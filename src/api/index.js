/**
 * 包含应用所有接口的亲求函数
 */
import ajax from './ajax'
// export function reqLogin(){
//     ajax('/login',{username,password},'POST')
// }


export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST')

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

export const getApiForCaseData = (apiId,userId) => ajax(`/apicase/caseAdd?apiId=${apiId}&userId=${userId}`, {}, 'GET')



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
    
    return ajax(url, {}, 'GET');
}

export const getApiCaseData = (id,userId) => ajax(`/apicase/caseUpdate?id=${id}&userId=${userId}`, {}, 'GET')

export const updateApiCaseData = (apiCaseData) => ajax('/apicase/update', apiCaseData, 'POST')

export const addApiCaseData = (apiCaseData) => ajax('/apicase/add', apiCaseData, 'POST')

export const delApiCaseData = (id,userId) => ajax (`/apicase/del?id=${id}&userId=${userId}`,{},'POST')

export const getApiReport = (testIdList) => ajax('/report/list',testIdList,"POST")

export const searchTest = (value) => ajax(`/api/searchRely?path=${value}`,{},'GET')

export const searchTestName = (value) => ajax(`/api/searchRelyName?path=${value}`,{},'GET')