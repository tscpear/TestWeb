import React from 'react'
import { Select } from 'antd'
import storageUtils from '../utils/storageUtils'
import { DEVICE_COLOR } from '../utils/constants'

/**
 * 获取设备名称列表
 */
const deviceNames = storageUtils.getData('device_list_key')
/**
 * 形成选择设备的option
 * @param {设备名称} item 
 * @param {value} index 
 */
const deviceSelects = (item, index) => {
    return <Select.Option value={index + 1}>{item}</Select.Option>
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