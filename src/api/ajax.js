/**
 * 能发送异步ajax请求的异步模块
 * 封装axios库
 * 函数的返回值promise对象
 */
import axios from 'axios'
import {message} from 'antd'
import storageUtils from '../utils/storageUtils'
export default function ajax(url, data = {}, type) {
    
    return new Promise((resolve, reject) => {
        let promise;
        const projectId = storageUtils.getProjectId();
        
    
        
        
        //执行异步ajax请求
    
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
        promise = axios({
            method: type,
            url: url,
            data: data,
            headers:{'projectId':projectId}
         
        })
          //如果成功了，调用resolve（value）
        promise.then(response =>{
            resolve(response)
        }).catch(error =>{
            message.error('请求出错了：' + error.message)
        })
      

        //如果时报调用，不调用reject，提示异常信息
    })

    
}