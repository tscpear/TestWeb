import '../../apitest/index.less'
import React, { Component } from 'react'
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, InputNumber
} from 'antd'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined, SoundTwoTone } from '@ant-design/icons';
import { addGuiData ,updateGuiData} from '../../../api/index'
import { deviceSelect, responseJudge } from '../../../components/public'
export default class AddUpdate extends Component {
    state = {
        keyValueDisplay: "none",
        data: {},
        pageTitle: "新    增",
    }

    activeOnChange = (value) => {
        console.log(value)
        if (value === 3) {
            this.setState({ keyValueDisplay: "block" })
        } else {
            this.setState({ keyValueDisplay: "none" })
        }

    }
    componentDidMount = () => {
        if(this.props.location.state){
            this.setState({pageTitle:"编    辑"});
            this.activeOnChange(this.props.location.state.active);
        }
    }

    render() {

        const { keyValueDisplay, data, pageTitle } = this.state;

        const title = (
            <span>
                <a onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px', color: "#CCCCCC" }}>
                    {pageTitle}
                </span>
            </span>
        )
        const labelValue = (value) => (
            <div style={{ color: "#CCCCCC" }}>
                {value}
            </div>
        )

        const onFinish = async (value) => {
            var response;
            var result;
            if(this.props.location.state){
                value = Object.assign(value,{id:this.props.location.state.id})
                response = await updateGuiData(value);
            }else{
                 response = await addGuiData(value);
            }
            result = responseJudge(response);
            if (result) {
                this.props.history.goBack();
            }
        }
        const forms = () => {
            if (this.props.location.state) {
                return { 'initialValues': this.props.location.state }
            } else {
                return { 'initialValues': data }
            }
        }

        return (
            <Card className='myform contentMaxHeight guicasehomeadd' title={title}>
                <Form
                    name='form'
                    layout='inline'
                    hideRequiredMark={false}
                    labelCol={{ span: 2 }}
                    labelAlign='left'
                    onFinish={onFinish}
                    {...forms()}
                >
                    <Form.Item className='item' label={labelValue("事件描述")} name='name'>
                        <Input className='do' />
                    </Form.Item >
                    <Form.Item className='item' label={labelValue('设备终端')} name='device'>
                        <Select autoFocus={true} style={{ width: '200px' }} onChange={(value) => this.setState({ device: value })} placeholder="请选择设备">
                            {deviceSelect()}
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label={labelValue('事件元素')} name='element'>
                        <Input className='do' />
                    </Form.Item >
                    <Form.Item className='item' label={labelValue('事元类型')} name='elementType'>
                        <Select autoFocus={true} style={{ width: '200px' }}>
                            <Select.Option value={1}>id</Select.Option>
                            <Select.Option value={2}>xpath</Select.Option>
                            <Select.Option value={3}>className</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label={labelValue('事元动作')} name='active'  >
                        <Select autoFocus={true} style={{ width: '200px' }} onChange={e => this.activeOnChange(e)}>
                            <Select.Option value={1}>点击</Select.Option>
                            <Select.Option value={2}>双击</Select.Option>
                            <Select.Option value={3}>输入</Select.Option>
                            <Select.Option value={4}>清除</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label={labelValue('输入内容')} name='keyValue' style={{ display: keyValueDisplay }}>
                        <Input className='do' />
                    </Form.Item >
                    <Form.Item className='item' label={labelValue('断言元素')} name='assertElement'>
                        <Input className='do' />
                    </Form.Item >
                    <Form.Item className='item' label={labelValue('断元类型')} name='assertElementType'>
                        <Select autoFocus={true} style={{ width: '200px' }}>
                            <Select.Option value={1}>id</Select.Option>
                            <Select.Option value={2}>xpath</Select.Option>
                            <Select.Option value={3}>css</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label={labelValue('断言内容')} name='assertExpect'>
                        <Input className='do' placeholder="如果为空则断言该元素是否存在"/>
                    </Form.Item >
                    <Form.Item className='item' style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: '#99CCFF	', color: 'black', margin: '0px 10px' }}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}