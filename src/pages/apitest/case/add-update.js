import React, { Component } from 'react'
import { addApiData, updateApiData } from '../../../api/index'

import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, message
} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'
import { addApiCaseData, updateApiCaseData } from '../../../api/index'

export default class CaseAddUpdate extends Component {
    state = {
        data: {
            selectRelyCase: [{ 'apiPath': '1', 'value': '2' }],
            apiParamtype: [],
            headerParamType: [],
            headerHandleParam: [],
            headerFiexdParam: [],
            webformFiexdParam: [],
            webformParamType: [],
            bodyParamType: [],
            bodyHandleParam: [],
            isDepend: true,
            statusAssertion: '200',
            otherAssertioin: [],


        },
        isRelyDisplay: 'none',
        apiFiexdParamDisplay: 'none',
        headerParamDisplay: 'none',
        headerHandleDisplay: 'none',
        webformParamDisplay: 'none',
        webformHandleDisplay: 'none',
        bodyParamDisplay: 'none',
        bodyHandleDisplay: 'none',
        isDependDisplay: 'none',
        headerRelyDisplay: 'none',
        webformRelyDisplay: 'none',
        bodyRelyDisplay: 'none',
        rules: [{
            required: true,
            whitespace: true,
            message: "这你都不填，你以为你是客服吗！",
        },],
        relyTestMarkValue: null,
        relyTestIdValue: null,
    }


    //是否被依赖控制器
    isRelyOnChange = e => {
        let isRelyDisplay;
        let headerRelyDisplay;
        let webformRelyDisplay;
        let bodyRelyDisplay;
        let apiFiexdParamDisplay;
        const apiParamType = this.props.location.state;
        if (e) {
            isRelyDisplay = 'block';
            headerRelyDisplay = 'none';
            webformRelyDisplay = 'none';
            bodyRelyDisplay = 'none';
            apiFiexdParamDisplay = 'none';



        } else {
            isRelyDisplay = 'none';
            headerRelyDisplay = 'block';
            webformRelyDisplay = 'block';
            bodyRelyDisplay = 'block';
            if (apiParamType === "2") {
                apiFiexdParamDisplay = 'block';
            }
        }
        this.setState({ isRelyDisplay, headerRelyDisplay, webformRelyDisplay, bodyRelyDisplay,apiFiexdParamDisplay })
    }

    componentDidMount() {
        const data = this.props.location.state;
        this.setState({ data });
        const apiParamType = data.apiParamType;
        const isDepend = data.isDepend
        if (data.id) {
            this.setState({ title: '编辑用例', className: 'myform contentMaxHeight caseadd' })
        } else {
            this.setState({ title: '新增用例', className: 'myform contentMaxHeight caseupdate' })
        }


        if (apiParamType === '3' || (apiParamType === "2" && !isDepend)) {
            this.setState({ apiFiexdParamDisplay: 'block' })
        }
        const headerParamType = data.headerParamType;
        headerParamType.map(item => {
            if (item === '1') {
                this.setState({ headerParamDisplay: 'block' })
            }
            if (item === '3') {
                this.setState({ headerHandleDisplay: 'inline-block' })
            }
        })
        const webformParamType = data.webformParamType;
        webformParamType.map(item => {
            if (item === '1') {
                this.setState({ webformParamDisplay: 'block' })
            }
            if (item === '3') {
                this.setState({ webformHandleDisplay: 'inline-block' })
            }
        })
        const bodyParamType = data.bodyParamType;
        bodyParamType.map(item => {
            if (item === '1') {
                this.setState({ bodyParamDisplay: 'block' })
            }
            if (item === '3') {
                this.setState({ bodyHandleDisplay: 'inline-block' })
            }
        })
        const hasRely = data.hasRely;
        if (hasRely === true) {
            this.setState({ isDependDisplay: 'block' })
            if (isDepend === true) {
                this.setState({ isRelyDisplay: 'block' })
            } else {
                this.setState({ headerRelyDisplay: 'block' })
                this.setState({ webformRelyDisplay: 'block' })
                this.setState({ bodyRelyDisplay: 'block' })
            }
        } else {
            this.setState({
                isDependDisplay: 'none',
                isRelyDisplay: 'none',
                headerRelyDisplay: 'none',
                webformRelyDisplay: 'none',
                bodyRelyDisplay: 'none'
            })
        }

    }
    render() {
        const {
            isRelyDisplay,
            data,
            apiFiexdParamDisplay,
            headerParamDisplay,
            headerHandleDisplay,
            webformHandleDisplay,
            webformParamDisplay,
            bodyHandleDisplay,
            bodyParamDisplay,
            isDependDisplay,
            rules,
            headerRelyDisplay,
            webformRelyDisplay,
            bodyRelyDisplay,

        } = this.state;

        //一级方法
        const frist = (name) => {
            const rules = () => {
                const rules = [{
                    required: true,
                    whitespace: true,
                    message: "咋不填呢",
                }];
                if (isRelyDisplay === "none") {
                    return { "rule": rules };
                }
            }
            const data = this.props.location.state.selectRelyCase;
            const getOptionId = (index) => {
                let option = data[index].relyCase.map(item => <Select.Option key={item.apiCaseId}>{item.apiCaseId}</Select.Option>);
                return option;
            }
            const getOptionMark = (index) => {
                let option = data[index].relyCase.map(item => <Select.Option key={item.apiCaseId}><Tag color="green">{item.apiCaseId}</Tag>{item.apiCaseMark}</Select.Option>);
                return option;
            }
            // const optionId = this.state.data.map(item => <Select.Option key={item.apiCaseId}>{item.apiCaseId}</Select.Option>);
            // const optionMark = this.state.data.map(item => <Select.Option key={item.apiCaseId}>{item.apiCaseMark}</Select.Option>);
            return (
                <Form.List name={name} >
                    {(fields) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '30%', padding: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'apiPath']}
                                                fieldKey={[field.fieldKey, 'apiPath']}
                                                {...rules}
                                            >
                                                <Input className='do' disabled />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '55%' }}>
                                            <Form.Item
                                                name={[field.name, "apiCaseMark"]}
                                                fieldKey={[field.fieldKey, "apiCaseMark"]}
                                                {...rules}
                                            >
                                                <Select
                                                    showSearch
                                                    defaultActiveFirstOption={false}
                                                    showArrow={false}
                                                    filterOption={false}
                                                    placeholder="go"
                                                    notFoundContent={null}

                                                >
                                                    {getOptionMark(index)}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        );
                    }}
                </Form.List>
            )
        }
        //二级级方法
        const second = (name, disabled) => {
            const rules = () => {
                const rules = [{
                    required: true,
                    whitespace: true,
                    message: "咋不填呢",
                }];
                if (isRelyDisplay === "none") {
                    return { "rule": rules };
                }
            }


            return (
                <Form.List name={name} >
                    {(fields) => {
                        return (
                            <div>
                                {fields.map((field) => (
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '30%', margin: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                {...rules}
                                            >
                                                <Input className='do' disabled='true' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '65%' }}>
                                            <Form.Item
                                                name={[field.name, "value"]}
                                                fieldKey={[field.fieldKey, "value"]}
                                                {...rules}
                                            >
                                                <Input className='do' disabled={disabled} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        );
                    }}
                </Form.List>
            )
        }
        //三级级级方法
        const third = (name, disabled) => {
            const rules = [{
                required: true,
                whitespace: true,
                message: "咋不填呢",
            }];


            return (
                <Form.List name={name} >
                    {(fields) => {
                        return (
                            <div>
                                {fields.map((field) => (
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '30%', margin: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={rules}
                                            >
                                                <Input className='do' disabled='true' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '65%' }}>
                                            <Form.Item
                                                name={[field.name, "value"]}
                                                fieldKey={[field.fieldKey, "value"]}
                                                rules={rules}
                                            >
                                                <Input className='do' disabled={disabled} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        );
                    }}
                </Form.List>
            )
        }



        const onFinish = async (value) => {
            delete (value['apiMark']);
            delete (value['apiPath']);
            delete (value['headerFiexdParam']);
            delete (value['webformFiexdParam']);
            delete (value['bodyFiexdParam']);

            if (value.isDepend === undefined) {
                value.isDepend = true;
            }
            const user = memoryUtils.user;
            const data = this.props.location.state;
            const apiId = data.apiId;
            let values = Object.assign(value, { "userId": user.id, 'apiId': apiId })
            let response;
            let result;
            if (data.id) {
                value = Object.assign(value, { "id": this.props.location.state.id })
                response = await updateApiCaseData(values);
                result = response.data;
                if (result.code == 1) {
                    this.props.history.goBack();
                 
                } else {
                    const msg = response.data.msg
                    message.error(msg)
                }
            } else {
                response = await addApiCaseData(values);
                result = response.data;
                if (result.code == 1) {
                    this.props.history.goBack();
                  
                } else {
                    const msg = response.data.msg
                    message.error(msg)
                }
            }

        }

        //二级页面的标题
        const title = (
            <span>
                <a onClick={() => this.props.history.push('/apitest/uri')}>
                    <ArrowLeftOutlined style={{ color: 'green' }} />
                </a>
                <span style={{ padding: '0px 15px' }}>
                    {this.state.title}
                </span>
            </span>)

        const forms = () => {
            if (this.props.location.state) {
                let data = this.props.location.state;
                data = Object.assign(data, { "statusAssertion": '200' })
                return { 'initialValues': data }
            } else {
                return { 'initialValues': data }
            }
        }

        const deviceTypeList = () => {
            const lists = [true, true, true, true, true, true, true]
            const data = this.props.location.state;
            const device = data.device
            const list = data.deviceTypeList;
            list.map(item => {
                lists[item - 1] = false
            })
            const store = (
                <Radio.Group>
                    <Radio value='1' disabled={lists[0]}><Tag color="magenta">网红授权/取货点/网红店旗下服务车</Tag></Radio>
                    <Radio value='2' disabled={lists[1]}><Tag color="magenta">非授权门店</Tag></Radio>
                    <Radio value='3' disabled={lists[2]}><Tag color="magenta">社会服务车</Tag></Radio>
                    <Radio value='4' disabled={lists[3]}><Tag color="magenta">取货方门店</Tag></Radio>
                    <Radio value='5' disabled={lists[4]}><Tag color="magenta">取货方门店下服务车</Tag></Radio>
                    <Radio value='6' disabled={lists[5]}><Tag color="magenta">取货方社会服务车</Tag></Radio>
                </Radio.Group>
            )

            switch (device) {
                case '2':
                    return store;
            }
        }

        const defaultChecked = () => {
            if (this.props.location.state.isDepend === true) {
                return { "defaultChecked": true }
            }
        }
        return (



            <Card
                title={title}
                className={this.state.className}
            >
                <Form
                    name='form'
                    layout='inline'
                    hideRequiredMark='true'
                    labelAlign='left'
                    onFinish={onFinish}
                    {...forms()}

                >
                    <Form.Item className='item' label='接口路径' name='apiPath'>
                        <Input className='do' disabled />
                    </Form.Item>
                    <Form.Item className='item' label='接口描述' name='apiMark'>
                        <Input className='do' disabled />
                    </Form.Item>
                    <Form.Item className='itemss' label='角色类型' name='deviceType'>
                        {deviceTypeList()}
                    </Form.Item>
                    <Form.Item className='item' label='用例描述' name='apiCaseMark' rules={rules}>
                        <Input className='do' />
                    </Form.Item>
                    <Form.Item className='item' label='用例类型' name='apiCaseType' rules={rules}>
                        <Radio.Group>
                            <Radio value='1'><Tag color="green">任意使用</Tag></Radio>
                            <Radio value='2'><Tag color="geekblue">仅限流程</Tag></Radio>
                            <Radio value='3'><Tag color="red">内部消耗</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className='item' label='用例等级' name='apiCaseLv' rules={rules} >
                        <Radio.Group>
                            <Radio value='1'><Tag color="green">无关紧要</Tag></Radio>
                            <Radio value='2'><Tag color="geekblue">一般般啦</Tag></Radio>
                            <Radio value='3'><Tag color="red">叼的一匹</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{ width: '100%', display: isDependDisplay }}>
                        <Form.Item className='item' label='开启依赖' name='isDepend'>
                            <Switch onChange={this.isRelyOnChange} {...defaultChecked()} />
                        </Form.Item>
                        <div style={{ display: isRelyDisplay, width: '100%' }}>
                            <Form.Item label='选择依赖' className='itemss'>
                                {frist('selectRelyCase')}
                            </Form.Item>
                        </div>
                        <div style={{ display: apiFiexdParamDisplay, width: '100%' }}>
                            <Form.Item label='接口传参' className='item' name='apiHandleParam'>
                                <Input placeholder='请输入参数' className='do' />
                            </Form.Item>
                        </div>
                    </div>
                    <div style={{ display: headerParamDisplay, width: '100%' }} >

                        <Form.Item label='头部参数' className='itemss'>
                            <div style={{ width: '45%', display: 'inline-block', verticalAlign: 'top' }}>
                                {/* <div style={{ width: '100%', textAlign: "center" }}>
                                    <p>基本样式</p>
                                </div> */}
                                {second('headerFiexdParam', true)}
                            </div>
                            <div style={{ width: '45%', verticalAlign: 'top', display: 'inline-block' }}>
                                <div style={{ width: '100%', display: headerHandleDisplay }}>
                                    {second('headerHandleParam')}
                                </div>
                                <div style={{ width: '100%', display: headerRelyDisplay }}>
                                    {second('headerRelyToHandle')}
                                </div>
                            </div>

                        </Form.Item>
                    </div>
                    <div style={{ display: webformParamDisplay, width: '100%' }} >
                        <Form.Item label='表单参数' className='itemss'>
                            <div style={{ width: '45%', display: 'inline-block', verticalAlign: 'top' }}>
                                {second('webformFiexdParam', true)}
                            </div>
                            <div style={{ width: '45%', verticalAlign: 'top', display: 'inline-block' }}>
                                <div style={{ width: '100%', display: webformHandleDisplay }}>
                                    {second('webformHandleParam')}
                                </div>
                                <div style={{ width: '100%', display: webformRelyDisplay }}>
                                    {second('webformRelyToHandle')}
                                </div>
                            </div>
                        </Form.Item>
                    </div>
                    <div style={{ display: bodyParamDisplay, width: '100%' }} >
                        <Form.Item label='json参数' className='itemss'>
                            <div style={{ width: '45%', display: 'inline-block', verticalAlign: 'top', padding: '0px 35px 0px 0px' }}>


                                <Form.Item style={{ paddingLeft: '2px' }} name='responseBase'>
                                    <Input.TextArea
                                        className='do'
                                        placeholder="返回值基本格式"
                                        autoSize={{ minRows: 3, maxRows: 10 }}
                                        disabled='true'
                                    />
                                </Form.Item>
                            </div>
                            <div style={{ width: '45%', verticalAlign: 'top', display: 'inline-block' }}>
                                <div style={{ width: '100%', display: bodyHandleDisplay }}>
                                    {second('bodyHandleParam')}
                                </div>
                                <div style={{ width: '100%', display: bodyRelyDisplay }}>
                                    {second('bodyformRelyToHandle')}
                                </div>
                            </div>
                        </Form.Item>
                    </div>
                    <Form.Item className='item' label='响应断言' name='statusAssertion'>
                        <Select dropdownClassName='do' autoFocus='true' style={{ width: '100px' }}>
                            <Select.Option value='200'>200</Select.Option>
                            <Select.Option value='403'>403</Select.Option>
                            <Select.Option value='406'>406</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label='其他断言' name='otherAssertioin'>
                        <Checkbox.Group >
                            <Checkbox value='1'><Tag color="purple">全部返回值断言</Tag></Checkbox>
                            <Checkbox value='2'><Tag color="purple">部分返回值断言</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="red">数据落库断言</Tag></Checkbox>
                            <Checkbox value='4'><Tag color="green">返回值与数据库比对断言</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item className='item' style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                            提交
                        </Button>
                    </Form.Item>
                    <div style={{ height: '100px' }}></div>

                </Form>

            </Card>

        )
    }

}