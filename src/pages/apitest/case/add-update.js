import React, { Component } from 'react'
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, InputNumber
} from 'antd'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'
import { addApiCaseData, updateApiCaseData } from '../../../api/index'
import { responseJudge } from '../../../components/public';

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
            otherAssertionType: [],


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
            required: false,
            whitespace: false,
            message: "这你都不填，你以为你是客服吗！",
        },],
        relyTestMarkValue: null,
        relyTestIdValue: null,
        deviceTypeDispaly: 'none',
        responseValueExpectDisplay: 'none',
        sqlValueExpectDisplay: 'none',
        closeCaseDisplay: 'none'
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
        this.setState({ isRelyDisplay, headerRelyDisplay, webformRelyDisplay, bodyRelyDisplay, apiFiexdParamDisplay })
    }

    onChangeCloseCase = (e) => {
        let display = e.target.checked;
        if (display === true) {
            this.setState({ closeCaseDisplay: "block" });
        } else {
            this.setState({ closeCaseDisplay: "none" });
        }
    }

    componentDidMount() {

        const data = this.props.location.state;
        const rules = [{
            required: true,
            whitespace: true,
            message: "这你都不填，你以为你是客服吗！",
        },];
        this.setState({ data });
        const apiParamType = data.apiParamType;
        const isDepend = data.isDepend
        if (data.id) {
            this.setState({ title: '编辑用例', className: 'myform contentMaxHeight caseadd' })
        } else {
            this.setState({ title: '新增用例', className: 'myform contentMaxHeight caseupdate', rules })
        }


        if (apiParamType == '3' || (apiParamType == "2" && !isDepend)) {
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
        const device = data.device;
        if (device == "2" || device == "4" || device == "3") {
            this.setState({ deviceTypeDispaly: 'block' });
        }

        const otherAssertionType = data.otherAssertionType;
        if (otherAssertionType) {
            otherAssertionType.map(item => {
                if (item == '2') {
                    this.setState({ responseValueExpectDisplay: 'block' });
                }
            });
        }
        const preCase = data.preCase;
        if (preCase) {
            preCase.map(item => {
                if (item === 2) {
                    this.setState({ closeCaseDisplay: "block" });
                }
            })
        }
    }
    responseValueExpectDisplayOnChange = e => {
        if (e.target.checked) {
            this.setState({ responseValueExpectDisplay: 'block' });
        } else {
            this.setState({ responseValueExpectDisplay: 'none' });
        }
    }
    sqlValueExpectDisplayOnChange = e => {
        if (e.target.checked) {
            this.setState({ sqlValueExpectDisplay: 'block' });
        } else {
            this.setState({ sqlValueExpectDisplay: 'none' });
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
            deviceTypeDispaly,
            responseValueExpectDisplay,
            sqlValueExpectDisplay,
            closeCaseDisplay,
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
                                                <Input className='do' disabled={true} />
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
        const thrid = (name, fristPlaceholder, secondPlaceholder, addName, display) => {
            const rules = () => {
                let required = true;
                if (display == "none") {
                    required = false;
                }
                let rule = [{
                    required: required,
                    whitespace: true,
                    message: "咋不填呢",
                }]
                return rule;
            };
            return (
                <Form.List name={name} >
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '30%', padding: '0px 1px 0px 0px' }}>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                fieldKey={[field.fieldKey, 'name']}
                                                rules={rules()}
                                            >
                                                <Input placeholder={fristPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col style={{ width: '65%' }}>
                                            <Form.Item
                                                name={[field.name, "value"]}
                                                fieldKey={[field.fieldKey, "value"]}
                                                rules={rules()}
                                            >
                                                <Input placeholder={secondPlaceholder} className='do' />
                                            </Form.Item>
                                        </Col>
                                        <Col flex="none" style={{ width: '5%' }} >
                                            <MinusCircleOutlined
                                                style={{ height: '15px', padding: '4px' }}
                                                onClick={() => {
                                                    remove(field.name);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                ))}
                                <Form.Item>
                                    <Button
                                        className='do'
                                        type="dashed"
                                        onClick={() => {
                                            add();
                                        }}
                                        style={{ width: "95%", marginTop: '5px' }}
                                    >
                                        <PlusOutlined /> {addName}
                                    </Button>
                                </Form.Item>
                            </div>
                        );
                    }}
                </Form.List>
            )
        }

        const rulesForm = [{ required: true, message: '必填的' }];
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
                result = responseJudge(response);
                if (result) {
                    this.props.history.goBack();
                }
            } else {
                response = await addApiCaseData(values);
                result = responseJudge(response);
                if (result) {
                    this.props.history.goBack();
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
            const data = this.props.location.state;
            const device = data.deviceTypeList;
            let option = [];
            device.map((item, index) => {
                option.push(<Radio value={index + 1} key={index + 1}><Tag color='magenta'>{item}</Tag></Radio>)
            })
            return option;
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
                    hideRequiredMark={true}
                    labelAlign='left'
                    onFinish={onFinish}
                    {...forms()}

                >
                    <Form.Item className='item' label='接口路径' name='apiPath' rules={rulesForm}>
                        <Input className='do' disabled />
                    </Form.Item>
                    <Form.Item className='item' label='接口描述' name='apiMark' rules={rulesForm}>
                        <Input className='do' disabled />
                    </Form.Item>
                    <div style={{ width: "100%" }}>
                        <Form.Item className='itemss' label='角色类型' name='deviceType' rules={rulesForm}>
                            <Radio.Group>
                                {deviceTypeList()}
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <Form.Item className='item' label='用例描述' name='apiCaseMark' rules={rulesForm}>
                        <Input className='do' />
                    </Form.Item>
                    <Form.Item className='item' label='用例类型' name='apiCaseType' rules={rulesForm}>
                        <Radio.Group>
                            <Radio value={1}><Tag color="green">正常使用</Tag></Radio>
                            <Radio value={2}><Tag color="geekblue">重在回归</Tag></Radio>
                            <Radio value={3}><Tag color="red">创建数据</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className='item' label='用例等级' name='apiCaseLv' rules={rulesForm}>
                        <Radio.Group>
                            <Radio value={1}><Tag color="green">无关紧要</Tag></Radio>
                            <Radio value={2}><Tag color="geekblue">一般般啦</Tag></Radio>
                            <Radio value={3}><Tag color="red">叼的一匹</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{ width: '100%', display: isDependDisplay }}>
                        <Form.Item className='item' label='开启依赖' name='isDepend'>
                            <Switch onChange={this.isRelyOnChange} {...defaultChecked()} />
                        </Form.Item>
                    </div>
                    <div style={{ display: isRelyDisplay, width: '100%' }}>
                        <Form.Item label='选择依赖' className='itemss'>
                            {frist('selectRelyCase')}
                        </Form.Item>
                    </div>
                    <div style={{ display: apiFiexdParamDisplay, width: '100%' }} >
                        <Form.Item label='接口传参' className='item' name='apiHandleParam' rules={apiFiexdParamDisplay === 'none' ? '' : rulesForm}>
                            <Input placeholder='请输入参数' className='do' />
                        </Form.Item>
                    </div>
                    <div style={{ display: headerParamDisplay, width: '100%' }} >
                        <Form.Item label='头部参数' className='itemss'>
                            <div style={{ width: '45%', display: 'inline-block', verticalAlign: 'top' }}>
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
                    <Form.Item className='item' label='前置用例' name='preCase'>
                        <Checkbox.Group>
                            <Checkbox value={1} disabled={true}><Tag color="green">超前置用例</Tag></Checkbox>
                            <Checkbox value={2} onChange={this.onChangeCloseCase}><Tag color="geekblue">贴身前置用例</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ display: closeCaseDisplay, width: '100%' }} >
                        <Form.Item className='item' label="贴身前置" name="closeCase" rules={closeCaseDisplay === 'none' ? '' : rulesForm}>
                            <InputNumber maxLength="3" className='do' />
                        </Form.Item>
                    </div>


                    <div style={{ display: bodyParamDisplay, width: '100%' }} >
                        <Form.Item label='json参数' className='itemss'>
                            <div style={{ width: '45%', display: 'inline-block', verticalAlign: 'top', padding: '0px 35px 0px 0px' }}>
                                <Form.Item style={{ paddingLeft: '2px' }} name='bodyFiexdParam'>
                                    <Input.TextArea
                                        className='do'
                                        placeholder="返回值基本格式"
                                        autoSize={{ minRows: 3, maxRows: 10 }}
                                        disabled={true}
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
                        <Select dropdownClassName='do' autoFocus={true} style={{ width: '100px' }}>
                            <Select.Option value='200'>200</Select.Option>
                            <Select.Option value='201'>201</Select.Option>
                            <Select.Option value='403'>403</Select.Option>
                            <Select.Option value='406'>406</Select.Option>
                            <Select.Option value='500'>500</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className='item' label='其他断言' name='otherAssertionType' style={{ width: '80%' }}>
                        <Checkbox.Group >
                            <Checkbox value='1'><Tag color="purple">返回值结构断言</Tag></Checkbox>
                            <Checkbox value='2' onChange={this.responseValueExpectDisplayOnChange}><Tag color="purple">特定返回值断言</Tag></Checkbox>
                            <Checkbox value='3' onChange={this.sqlValueExpectDisplayOnChange}><Tag color="red">数据落库字段值断言</Tag></Checkbox>
                            <Checkbox value='4'><Tag color="red">返回值与数据库比对断言</Tag></Checkbox>
                            <Checkbox value='5'><Tag color="green">双接口返回值断言</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ display: responseValueExpectDisplay, width: '50%' }}>
                        <Form.Item label='返值期望' className='itemss'>
                            {thrid('responseValueExpect', '路径', '期望值', '添加期望值', responseValueExpectDisplay)}
                        </Form.Item>
                    </div>
                    <div style={{ display: sqlValueExpectDisplay, width: '100%' }}>
                        <Form.Item label='库值期望' className='itemss'>
                            {thrid('sqlValueExpect', '期望值', 'sql语言', '添加期望值', sqlValueExpectDisplay)}
                        </Form.Item>
                    </div>
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