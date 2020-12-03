import React from 'react'
import { Select, message, Modal, Button, Space } from 'antd'
import storageUtils from '../utils/storageUtils'
import memoryUtils from '../utils/memoryUtils'
import { DEVICE_COLOR } from '../utils/constants'

/**
 * 获取设备名称列表
 */
const deviceNames = storageUtils.getData('device_list_key')
const ReachableContext = React.createContext();
const UnreachableContext = React.createContext();

/**
 * 形成选择设备的option
 * @param {设备名称} item 
 * @param {value} index 
 */
const deviceSelects = (item, index) => {
    return <Select.Option value={index + 1} key={index + 1}>{item}</Select.Option>
}



/**
 * 展示列表中的设备名称
 * @param {设备ID} device 
 */
export const deviceNameOfList = (device) => {
    if (deviceNames) {
        return deviceNames[parseInt(device) - 1]
    }
}

/**
 * 展示列表中的设备名称的颜色样式
 * @param {设备ID} device 
 */
export const deviceColorOfList = (device) => {
    return DEVICE_COLOR[parseInt(device)]
}

/**
 * 输出option
 */
export const deviceSelect = () => {
    let options = [];
    if (deviceNames) {
        deviceNames.map((item, index) => {
            options.push(deviceSelects(item, index))
        })
    }
    return options
}
/**
 * 请求返回值处理
 */
export const responseJudge = (response) => {
    const result = response.data;
    const msg = result.msg
    if (result.code === 1) {
        if(msg){
            message.success(msg);    
        }  
        return result  
    } else if (result.code === 3) {
        message.error(msg);
        storageUtils.removeData("user_key");
        memoryUtils.user = {}
    } else if (result.code === 0) {
        message.error(msg);
        return false;
    } else {
        return result;
    }
}
/**
 * 二次确认弹框
 */
export const confirmationTwo = (value) => {
    const [modal, contextHolder] = Modal.useModal();
    const config = {
        content: (
            <p>{value}</p>
        ),
    };
    return modal.confirm(config);
}


