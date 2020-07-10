import React from 'react'
import storageUtils from '../../utils/storageUtils'
import {
   Select
} from 'antd'

class EnvironmentSelect extends React.Component {

    f


    render() {

        const environmentItem = storageUtils.getEnvironment();
        return (
            <Select autoFocus='true' style={{ width: '100px' }} defaultValue='uat' onChange={this.environmentOnChange}>
               {EnvironmentSelect.map((item,index)=>(
                    <Select.Option key={index}>{item}</Select.Option>
               ))}
            </Select>
        )
    }
}
export default EnvironmentSelect;