import React, { Component } from 'react'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card, Form, Input, Button, Modal,
    Row, Col,
} from 'antd'
import '../index.less'
import { addApiCaseGroup, updateApiCaseGroup } from '../../../api/index'
import { responseJudge } from '../../../components/public'
export default class GroupAddAndUpdate extends Component {
    state = {
        title: "新   增",
        data: null,
    }


    componentDidMount = () => {
        const data = this.props.location.state;
        if (data && data.id) {
            this.setState({ title: "编   辑" });
        }
    }


    render() {
        const {
            data,
        } = this.state
        //二级页面的标题
        const title = (
            <span>
                <a onClick={() => this.props.history.push('/apitest/group')}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px' }}>
                    {this.state.title}
                </span>


            </span>)

        const onFinish = async (value) => {
            const { title, data } = this.state;
            let response;
            if (title === "编   辑") {
                value = Object.assign(value, { "id": this.props.location.state.id })
                response = await updateApiCaseGroup(value);
            } else {
                response = await addApiCaseGroup(value);
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
                className='guicasehomeadd myform'
                title={title}
            >
                <Form
                    name='form'
                    onFinish={onFinish}
                    hideRequiredMark={true}
                    labelAlign='left'
                    {...forms()}
                >
                    <Form.Item name="groupMark">
                        <Input placeholder="流程描述"  className='do'/>
                    </Form.Item>
                    <h1 style={{color: 'yellow'}}> 格式：[1,2,3,-2,5];整数为用例Id，负数为等待时间，单位为秒；同一组中最好不要一样的用例</h1>
                    <Form.List name='caseList'>
                        {(fields, { add, remove }) => {
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <Row key={field.key}>
                                            <Col>
                                                <Form.Item
                                                    name={[field.name, 'caseList']}
                                                    fieldKey={[field.fieldKey, 'caseList']}
                                                    rules = {[{ required: true, message: '示例[1,2,3,4]', pattern: new RegExp(/^[-0-9,\[\]]+$/, 'g') }]}
                                                >
                                                    <Input placeholder="请按顺序输入测试用例的ID" style={{ width: "300px" }}  className='do'  />
                                                </Form.Item>
                                            </Col>
                                            <Col style={{ padding: '0px 10px' }}>
                                                <Form.Item
                                                    name={[field.name, 'groupMark']}
                                                    fieldKey={[field.fieldKey, 'groupMark']}
                                                >
                                                    <Input placeholder="描述"  className='do'/>
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
                                            <PlusOutlined /> 添加测试模块
                                    </Button>
                                    </Form.Item>
                                </div>
                            )
                        }}
                    </Form.List>
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