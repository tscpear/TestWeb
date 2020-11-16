import React, { Component } from 'react'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card, Form, Input, Button, Modal,
    Row, Col,Select
} from 'antd'
import '../../apitest/index.less'
import { addGuiGroup, updateGuiGroupData } from '../../../api/index'
import { responseJudge,deviceSelect } from '../../../components/public'
export default class GuiTestGroupAddUpdate extends Component {
    state = {
        title: "新   增",
        data: null,
    }


    componentDidMount = () => {
        const data = this.props.location.state;
        if (data && data.id) {
            this.setState({ title: "编   辑",data:data});
        }
    }


    render() {
        const {
            data,
        } = this.state
        //二级页面的标题
        const title = (
            <span>
                <a onClick={() => this.props.history.push('/guiTest/test')}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px' }}>
                    {this.state.title}
                </span>


            </span>)

        const onFinish = async (value) => {
            const { title } = this.state;
            let response;
            if (title === "编   辑") {
                value = Object.assign(value, { "id": this.props.location.state.id })
                response = await updateGuiGroupData(value);
            } else {
                response = await addGuiGroup(value);
            }
            const result = responseJudge(response);
            if (result) {
                this.props.history.goBack();
            }



            console.log(value);
        }
        const forms = () => {
            if (this.props.location.state) {
                return { 'initialValues': this.props.location.state }
            } else {
                return { 'initialValues': data }
            }
        }

        return (


            <Card
                className='groupadd myform'
                title={title}
            >
                <h1 style={{color:"black",fontSize:"20px"}}>确保每个机器编码的独立性，及一个机器只支持一个APP的一种类型的账号操作</h1>
                <Form
                    name='form'
                    onFinish={onFinish}
                    hideRequiredMark={true}
                    labelAlign='left'
                    {...forms()}
                >
                    <Form.Item name="groupMark">
                        <Input placeholder="流程描述" className='do' />
                    </Form.Item>
                    <Form.List name='deviceList' >
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Row key={field.key}>
                                            <Col style={{width:"10%"}}>
                                                <Form.Item
                                                    name={[field.name, 'driverName']}
                                                    fieldKey={[field.fieldKey, '    ']}
                                                    rules = {[{ required: true, message: '示例1-1', pattern: new RegExp(/^[-0-9]+$/, 'g') }]}
                                                >
                                                    <Input placeholder="机器编号" className='do' />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ padding: '0px 10px' ,width:"10%"}}>
                                                <Form.Item
                                                    name={[field.name, 'deviceId']}
                                                    fieldKey={[field.fieldKey, 'deviceId']}
                                                >
                                                    <Select autoFocus={true} onChange={(value) => this.setState({ device: value })} placeholder="执行设备">
                                                        {deviceSelect()}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ padding: '0px 10px' ,width:"30%" }}>
                                                <Form.Item
                                                    name={[field.name, 'list']}
                                                    fieldKey={[field.fieldKey, 'list']}
                                                   
                                                >
                                                    <Input placeholder="用例编号" className='do' />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ padding: '0px 10px' ,width:"20%"}}>
                                                <Form.Item
                                                    name={[field.name, 'mark']}
                                                    fieldKey={[field.fieldKey, 'mark']}
                                                >
                                                    <Input placeholder="描述" className='do'/>
                                                </Form.Item>
                                            </Col>
                                            <Col flex="none" style={{ width: '10%' }} >
                                                <MinusCircleOutlined
                                                    style={{ height: '20px', padding: '5px' }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{ width: "30%", marginTop: '5px' }}
                                        >
                                            <PlusOutlined /> 添加用例组
                                    </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>
                    {/* <Form.List name='caseList' >
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Row key={field.key}>
                                            <Col>
                                                <Form.Item
                                                    name={[field.name, 'caseList']}
                                                    fieldKey={[field.fieldKey, 'caseList']}
                                                >
                                                    <Input placeholder="机器编号" style={{ width: "300px" }} className='do' />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ padding: '0px 10px' }}>
                                                <Form.Item
                                                    name={[field.name, 'groupMark']}
                                                    fieldKey={[field.fieldKey, 'groupMark']}
                                                >
                                                    <Input placeholder="描述" className='do' />
                                                </Form.Item>
                                            </Col>
                                            <Col flex="none" style={{ width: '10%' }} >
                                                <MinusCircleOutlined
                                                    style={{ height: '20px', padding: '5px' }}
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            onClick={() => {
                                                add();
                                            }}
                                            style={{ width: "30%", marginTop: '5px' }}
                                        >
                                            <PlusOutlined /> 添加测试用例组
                                    </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List> */}
                    <Form.Item className='item' style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>

        )
    }


}