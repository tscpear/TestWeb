import React, { Component } from "react";
import { crateDataTire, doHouse, completeStoreOrder } from '../../../api/index'
import { Card, message, Select, Input, Button, Form } from 'antd'
import '../../apitest/index.less'
import { deviceSelect, responseJudge } from '../../../components/public'
export default class Tire extends Component {
    state = {
        environment: 1,
        loading: false,
        lpsn: "",
        lpsnDispaly:"none",
        
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
        const { loading, lpsn,lpsnDispaly } = this.state;
    
        const onFinish1 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment });
            const response = await doHouse(value);
            responseJudge(response);

        }
        const onFinish2 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 2 });
            const response = await completeStoreOrder(value);
            responseJudge(response);
        }
        const onFinish3 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 3 });
            const response = await completeStoreOrder(value);
            responseJudge(response);
        }
        const onFinish4 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 4 });
            console.log(value);
            const response = await completeStoreOrder(value);
            responseJudge(response);
        }
        const onFinish5 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 5 });
            console.log(value);
            const response = await completeStoreOrder(value);
            console.log(response)
            responseJudge(response);
        }
        const onFinish6 = async (value) => {
            value = Object.assign(value, { environment: this.state.environment, type: 6 });
            console.log(value);
            const response = await completeStoreOrder(value);
            console.log(response)
            const data = responseJudge(response).data;
            this.setState({ lpsn: data,lpsnDispaly:"block" })
        }
        const sh =async (value,type) =>{
            value = Object.assign({}, { orderSn:value,environment: this.state.environment, type: type });
            console.log(value);
            const response = await completeStoreOrder(value);
            console.log(response)
            responseJudge(response);
        }




     
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
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish5}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='司机手机号' name='orderSn' >
                            <Input className='do' maxLength={11} />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                发放三包抵扣券
                        </Button>
                            <h>确保司机有质保中的质保卡</h>
                        </Form.Item>
                    </Form>
                </div>
                <div style={{ margin: '20px', padding: '20px', border: '2px solid grey' }}>
                    <Form
                        name='form'
                        layout='inline'
                        hideRequiredMark={true}
                        onFinish={onFinish6}
                        labelAlign='left'
                    >
                        <Form.Item className='item' label='司机手机号' name='orderSn' >
                            <Input className='do' maxLength={11} />
                        </Form.Item>
                        <Form.Item className='item' >
                            <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                                门店发起线上理赔
                        </Button>
                            <h>确保司机有质保中的质保卡</h>
                        </Form.Item>
                    </Form>
                    <div style={{display: lpsnDispaly}}>
                        <h1>理赔单号{lpsn}</h1>
                        <Button  onClick={()=>sh(lpsn,7)} style={{backgroundColor:"grey",margin:"0 5px"}}>审核通过</Button>
                        <Button  onClick={()=>sh(lpsn,8)} style={{backgroundColor:"grey",margin:"0 5px"}}>审核失败</Button>
                        <Button  onClick={()=>sh(lpsn,9)} style={{backgroundColor:"grey",margin:"0 5px"}}>作废</Button>
                    </div>
                </div>
            </Card>
        )

    }
}