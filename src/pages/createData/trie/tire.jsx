import React, { Component } from "react";
import { crateDataTire, doHouse, completeStoreOrder } from '../../../api/index'
import { Card, message, Select, Input, Button, Form } from 'antd'
import '../../apitest/index.less'
export default class Tire extends Component {
    state = {
        environment: 1,
        loading: false,
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
        const onFinish1 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment });
            const response = await doHouse(value);
        }
        const onFinish2 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 2 });
            const response = await completeStoreOrder(value);
        }
        const onFinish3 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 3 });
            const response = await completeStoreOrder(value);
        }
        const onFinish4 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 4 });
            console.log(value);
            const response = await completeStoreOrder(value);
        }



        const { loading } = this.state;
        return (
            <Card
                loading={loading}
                className='tirex'
            >
                <div style={{ margin: '20px' }}>
                    <Select autoFocus='true' style={{ width: '100px' }} defaultValue={1} onChange={this.environmentOnChange}>
                        <Select.Option value={1}>准生产</Select.Option>
                        <Select.Option value={2}>测试主</Select.Option>
                        <Select.Option value={3}>测试次</Select.Option>
                    </Select>
                </div>
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish1}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='商品id' name='tireId' >
                            <Input className='do' />
                        </Form.Item>
                        <Form.Item className='item' label='商品数量' name='num' >
                            <Input className='do' />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                分仓入库
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish2}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='出库单编号' name='orderSn' >
                            <Input className='do' />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                完成出库单的出库
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish3}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='门店订单编号' name='orderSn' >
                            <Input className='do' />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                完成门店订单
                        </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish4}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='司机订单号' name='orderSn' >
                            <Input className='do' />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                司机完成线上订单
                        </Button>
                        </Form.Item>
                    </Form>
                </div>


            </Card>
        )

    }
}