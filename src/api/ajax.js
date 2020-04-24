/**
 * 能发送异步ajax请求的异步模块
 * 封装axios库
 * 函数的返回值promise对象
 */
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url, data = {}, type = 'GET') {
    
    return new Promise((resolve, reject) => {
        let promise
        //执行异步ajax请求
        if (type === 'GET') {
            promise = axios.get(url, {
                params: data
            })
        } else {
            promise = axios.post(url, data)
        }
          //如果成功了，调用resolve（value）
        promise.then(response =>{
            resolve(response)
        }).catch(error =>{
            console.log('你妈妈吗')
            message.error('请求出错了：' + error.message)
        })
      

        //如果时报调用，不调用reject，提示异常信息
    })

    
}