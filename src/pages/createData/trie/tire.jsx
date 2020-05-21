import React, { Component } from "react";
import { crateDataTire } from '../../../api/index'
import { Card, Table, Button, message, Tag, Select, Input, Spin ,} from 'antd'
import { AudioOutlined } from '@ant-design/icons';
export default class Tire extends Component {
    state = {
        environment: "uat",
        loading:false,
    }



    onClick = async (value) => {
        this.setState({ loading: true })
        const response = await crateDataTire(value, this.state.environment);
        this.setState({ loading: false })
        const result = response.data
        const msg = result.msg
        if (result.code === 1) {
          message.success(msg)
        } else {
           
            message.error(msg)
        }

    }
    environmentOnChange = value => {
        this.setState({ environment: value })
    }

    render() {

        const {loading} = this.state;
        return (
            <Card
            loading={loading}
            >
                <Select autoFocus='true' style={{ width: '100px' }} defaultValue='uat' onChange={this.environmentOnChange}>
                    <Select.Option value='uat'>准生产</Select.Option>
                    <Select.Option value='tests'>测试次</Select.Option>
                    <Select.Option value='test'>测试主</Select.Option>
                </Select>
                <Input.Search
                    placeholder="输入订单编号"
                    enterButton="执行"
                    size="large"
                    onSearch={value => this.onClick(value)}
                    style={{ width: "50%" }}
                />
              
            </Card>
        )

    }
}