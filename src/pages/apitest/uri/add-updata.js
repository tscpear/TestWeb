import React, { Component } from 'react'
import { addApiData, updateApiData, searchTest, searchTestName } from '../../../api/index'

import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, message
} from 'antd'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'
import { deviceSelect, responseJudge } from '../../../components/public'


export default class AddUpdata extends Component {
    state = {
        //展示控制器
        apiData: {
            "apiParamType": "0",
            "apiRelyParamName": undefined,
            "apiRelyParamValue": undefined,
            "headerParamType": [],
            "headerHandleParam": [],
            "webformParamType": [],
            "webformFiexdParam": [],
            "webformRelyParam": [],
            "webformHandleParam": [],
            "bodyParamType": [],
            "bodyFiexdParam": "",
            "bodyRelyParam": [],
            "bodyHandleParam": [],
            "isRely": false,
            "relyValue": []
        },
        // apiData:{"id":7,"apiPath":"/lynx-goods/api/good/index","device":2,"apiMethod":1,"apiMark":"进入网红轮胎列表页面","apiParamType":[],"apiFiexedParam":"","apiRelyParamName":null,"apiRelyParamValue":null,"headerParamType":[],"headerFiexdParam":[],"headerRelyParam":[],"headerHandleParam":[],"webformParamType":[],"webformFiexdParam":[],"webformRelyParam":[],"webformHandleParam":[],"bodyParamType":[],"bodyFiexdParam":[],"bodyRelyParam":[],"bodyHandleParam":[],"isRely":0,"relyValue":"0"},
        title: "新   增",
        apiRelyDispaly: 'none',
        apiFiexdDispaly: 'none',
        headerFiexdParamDisplay: 'none',
        headerRelyParamDisplay: 'none',
        headerHandleParamDisplay: 'none',
        webformFiexdParamDisplay: 'none',
        webformRelyParamDisplay: 'none',
        webformHandleParamDisplay: 'none',
        bodyFiexdParamDisplay: 'none',
        bodyRelyParamDisplay: 'none',
        bodyHandleParamDisplay: 'none',
        isRelyDispay: 'none',
        rules: [{
            required: true,
            whitespace: true,
            message: "这你都不填，你以为你是客服吗！",
        },],
        apiRelySearch: [],
        apiRelySearchName: [],
        headerRelySearch: [],
        headerRelySearchName: [],
        webformRelySearch: [],
        webformRelySearchName: [],
        bodyRelySearch: [],
        bodyRelySearchName: [],
        apiRelySearchValue: undefined,
        device: 0,
        dependDisable: true,

    }
    //接口参数的点击展示控制器
    apiParamTypeOnChange = e => {
        let apiRelyDispaly = Object.assign({}, this.state.apiRelyDispaly);
        let apiFiexdDispaly = Object.assign({}, this.state.apiFiexdDispaly);
        if (e.target.value === '1') {
            apiFiexdDispaly = 'block';

        } else {
            apiFiexdDispaly = 'none';
        }

        if (e.target.value === '2') {
            apiRelyDispaly = 'block';
        } else {
            apiRelyDispaly = 'none';
        }

        this.setState({ apiFiexdDispaly, apiRelyDispaly });
    }

    //header参数点击展示控制器
    headerParamTypeOnChange = e => {
        let headerFiexdParamDisplay = 'none';
        let headerRelyParamDisplay = 'none';
        let headerHandleParamDisplay = 'none';
        let device = this.state.device;
        e.map(item => {
            if (item === '1') {
                headerFiexdParamDisplay = 'inline-block';
            }
            if (item === '2' && device !== 0) {
                headerRelyParamDisplay = 'inline-block';
            }
            if (item === '3') {
                headerHandleParamDisplay = 'inline-block';
            }
            return item;
        })
        this.setState({ headerFiexdParamDisplay, headerRelyParamDisplay, headerHandleParamDisplay });
    }

    //webform参数点击展示控制器
    webformParamTypeOnChange = e => {
        let webformFiexdParamDisplay = 'none';
        let webformRelyParamDisplay = 'none';
        let webformHandleParamDisplay = 'none';
        let device = this.state.device;
        e.map(item => {
            if (item === '1') {
                webformFiexdParamDisplay = 'inline-block';
            }
            if (item === '2' && device !== 0) {
                console.log("你妈妈吗");
                webformRelyParamDisplay = 'inline-block';
            }
            if (item === '3' && device !== 0) {
                webformHandleParamDisplay = 'inline-block';
            }
            return item;
        })
        this.setState({ webformFiexdParamDisplay, webformRelyParamDisplay, webformHandleParamDisplay });
    }
    //boby参数点击展示控制器
    bodyParamTypeOnChange = e => {
        let bodyFiexdParamDisplay = 'none';
        let bodyRelyParamDisplay = 'none';
        let bodyHandleParamDisplay = 'none';
        let device = this.state.device;
        e.map(item => {
            if (item === '1') {
                bodyFiexdParamDisplay = 'inline-block';
            }
            if (item === '2') {
                bodyRelyParamDisplay = 'inline-block';
            }
            if (item === '3') {
                bodyHandleParamDisplay = 'inline-block';
            }
            return item;
        })
        this.setState({ bodyFiexdParamDisplay, bodyRelyParamDisplay, bodyHandleParamDisplay })
    }

    //是否被依赖控制器
    isRelyOnChange = e => {
        let isRelyDispay;
        if (e) {
            isRelyDispay = 'block';
        } else {
            isRelyDispay = 'none';
        }
        this.setState({ isRelyDispay })
    }



    componentDidMount = () => {
        const apiData = this.props.location.state;
        let device;

        if (apiData && apiData.id) {
            this.setState({ title: "编   辑", device }, () => {
                device = apiData.device;
                this.headerParamTypeOnChange(apiData.headerParamType);
                this.webformParamTypeOnChange(apiData.webformParamType);
                this.bodyParamTypeOnChange(apiData.bodyParamType);
            });
            switch (apiData.apiParamType) {
                case "1":
                    this.setState({ apiFiexdDispaly: 'block' });
                    break;
                case "2":
                    this.setState({ apiRelyDispaly: 'block' });
                    break;
                default:
                    break;
            }
            if (apiData.isRely) {
                this.setState({ isRelyDispay: 'block' })
            }
            this.setState({ device: apiData.device });
        }


    }

    isRely = () => {
        if (this.props.location.state) {
            return this.props.location.state.isRely
        }
    }

    more = () => {
        if (this.props.location.state) {
            return this.props.location.state.more
        }
    }

    apiRelySearch = value => {
        if (value) {
            this.searchTest(value);
        } else {
            this.setState({ apiRelySearch: [] });
        }
    };

    apiRelyChange = value => {
        this.setState({ apiRelySearchValue: value });
        this.searchTestName(value);

    };

    searchTest = async (value, addName) => {
        const response = await searchTest(value);
        const result = responseJudge(response)
        const data = result.data;
        if (addName === 'header依赖参数') {
            this.setState({ headerRelySearch: data })
        } else if (addName === 'webform依赖参数') {
            this.setState({ webformRelySearch: data })
        } else if (addName === 'body依赖参数') {
            this.setState({ bodyRelySearch: data })
        } else {
            this.setState({ apiRelySearch: data });
        }

    }
    searchTestName = async (value, addName, index) => {
        const device = this.state.device;
        const response = await searchTestName(value, device);
        const result = responseJudge(response)
        const data = result.data;
        if (addName === 'header依赖参数') {
            let headerRelySearchName = this.state.headerRelySearchName;
            let headerRelySearchNameObject = Object.assign({ "index": index, "value": data });
            headerRelySearchName.push(headerRelySearchNameObject);
            this.setState({ headerRelySearchName })
        } else if (addName === 'webform依赖参数') {
            let webformRelySearchName = this.state.webformRelySearchName;
            let webformRelySearchNameObject = Object.assign({ "index": index, "value": data });
            webformRelySearchName.push(webformRelySearchNameObject);
            this.setState({ webformRelySearchName })
        } else if (addName === 'body依赖参数') {
            let bodyRelySearchName = this.state.bodyRelySearchName;
            let bodyRelySearchNameObject = Object.assign({ "index": index, "value": data });
            bodyRelySearchName.push(bodyRelySearchNameObject);
            this.setState({ bodyRelySearchName })
        } else {
            this.setState({ apiRelySearchName: data })
        }

    }
    secondRelySearch = (value, addName) => {
        if (value) {
            this.searchTest(value, addName);
        } else {
            if (addName === "header依赖参数") {
                this.setState({ headerRelySearch: [] })
            } else if (addName === "webform依赖参数") {
                this.setState({ webformRelySearch: [] })
            } else if (addName === "body依赖参数") {
                this.setState({ bodyRelySearch: [] })
            } else {
                this.setState({ apiRelySearch: [] });
            }
        }
    };

    secondRelyChange = (value, addName, index) => {
        this.searchTestName(value, addName, index);
    };

    render() {
        const {
            apiData,
            apiRelyDispaly,
            apiFiexdDispaly,
            headerRelyParamDisplay,
            headerHandleParamDisplay,
            headerFiexdParamDisplay,
            webformRelyParamDisplay,
            webformHandleParamDisplay,
            webformFiexdParamDisplay,
            bodyRelyParamDisplay,
            bodyHandleParamDisplay,
            bodyFiexdParamDisplay,
            isRelyDispay,
            rules,
            dependDisable,
        } = this.state


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



        //提交表单数据
        const onFinish = async (values) => {
            let response;
            const user = memoryUtils.user
            let value = Object.assign(values, { "userId": user.id })
            if (this.state.title === "编   辑") {
                value = Object.assign(value, { "id": this.props.location.state.id })
                response = await updateApiData(value);
            } else {
                response = await addApiData(value);
            }
            const result = responseJudge(response);
            if (result) {
                this.props.history.goBack();
            }
        }


        //一级方法
        const frist = (name, fristPlaceholder, secondPlaceholder, addName, display) => {
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

        //二级方法
        const second = (name, fristPlaceholder, secondPlaceholder, threePlaceholder, addName, display) => {
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

            const relyOptions = (addName) => {
                if (addName === 'header依赖参数') {
                    const option = this.state.headerRelySearch.map(item => <Select.Option key={item.value}>{item.text}</Select.Option>);
                    return option;
                } else if (addName === 'webform依赖参数') {
                    const option = this.state.webformRelySearch.map(item => <Select.Option key={item.value}>{item.text}</Select.Option>);
                    return option;
                } else if (addName === 'body依赖参数') {
                    const option = this.state.bodyRelySearch.map(item => <Select.Option key={item.value}>{item.text}</Select.Option>);
                    return option;
                }
            }

            const nameOptions = (addName, index) => {
                let option;
                if (addName === 'header依赖参数') {

                    this.state.headerRelySearchName.map(item => {
                        if (item.index == index) {
                            option = item.value.map(item => <Select.Option key={item}>{item}</Select.Option>);
                        }
                    });
                } else if (addName === 'webform依赖参数') {
                    console.log(this.state.webformRelySearchName);
                    this.state.webformRelySearchName.map(item => {
                        if (item.index == index) {
                            option = item.value.map(item => <Select.Option key={item}>{item}</Select.Option>);
                        }
                    });
                } else if (addName === 'body依赖参数') {
                    this.state.bodyRelySearchName.map(item => {
                        if (item.index == index) {
                            option = item.value.map(item => <Select.Option key={item}>{item}</Select.Option>);
                        }
                    });
                }
                return option;
            }


            return (
                <Form.List name={name} >
                    {(fields, { add, remove }) => {
                        return (
                            <div>
                                {fields.map((field, index) => (
                                    <Row key={field.key} style={{ margin: '3px 0px' }}>
                                        <Col style={{ width: '95%' }}>
                                            <Form.Item
                                                name={[field.name, 'apiPath']}
                                                fieldKey={[field.fieldKey, 'apiPath']}
                                                rules={rules()}>
                                                <Select
                                                    showSearch
                                                    defaultActiveFirstOption={false}
                                                    showArrow={false}
                                                    filterOption={false}
                                                    placeholder={threePlaceholder}
                                                    onSearch={value => this.secondRelySearch(value, addName)}
                                                    onChange={value => this.secondRelyChange(value, addName, index)}
                                                    notFoundContent={null}
                                                >
                                                    {relyOptions(addName)}
                                                </Select>
                                            </Form.Item>
                                        </Col>
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
                                                <Select
                                                    showSearch
                                                    defaultActiveFirstOption={false}
                                                    showArrow={false}
                                                    filterOption={false}
                                                    placeholder={secondPlaceholder}
                                                    notFoundContent={null}
                                                >
                                                    {nameOptions(addName, index)}
                                                </Select>
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


        const forms = () => {
            if (this.props.location.state) {
                return { 'initialValues': this.props.location.state }
            } else {
                return { 'initialValues': apiData }
            }
        }
        const apiRelyPathOptions = this.state.apiRelySearch.map(item => <Select.Option key={item.value}>{item.text}</Select.Option>);

        const apiRelyNameOptions = this.state.apiRelySearchName.map(item => <Select.Option key={item}>{item}</Select.Option>);

        const rulesForm = [{ required: true, message: '必填的' }];

        return (
            <Card title={title} className='myform contentMaxHeight apidatap' >
                <Form
                    name='form'
                    layout='inline'
                    onFinish={onFinish}
                    hideRequiredMark={true}
                    labelCol={{ span: 3 }}
                    labelAlign='left'
                    {...forms()}
                >
                    <Form.Item className='item' label='接口路径' name='apiPath' rules={rulesForm}>
                        <Input className='do' />
                    </Form.Item >
                    <Form.Item className='item' label='接口描述' name='apiMark' rules={rulesForm}>
                        <Input className='do' />
                    </Form.Item>
                    <Form.Item className='item' label='设备终端' name='device' rules={rulesForm}>
                        <Select autoFocus={true} style={{ width: '200px' }} onChange={(value) => this.setState({ device: value ,dependDisable:false})} placeholder="请选择客户端">
                            {deviceSelect()}
                        </Select>
                    </Form.Item>
                    <Form.Item label='复数接口' className='item' name='more'>
                        <Switch defaultChecked={this.more()} />
                    </Form.Item>
                    <Form.Item className='item' label='请求方式' name='apiMethod' rules={rulesForm}>
                        <Radio.Group>
                            <Radio value={1}><Tag color="gold">GET</Tag></Radio>
                            <Radio value={2}><Tag color="purple">POST</Tag></Radio>
                            <Radio value={3}><Tag color="cyan">PUT</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item className='items' label='接口传参' name='apiParamType'  >
                        <Radio.Group onChange={this.apiParamTypeOnChange} >
                            <Radio value='0'><Tag color="orange">无参数</Tag></Radio>
                            <Radio value='1'><Tag color="orange">固定参数</Tag></Radio>
                            <Radio value='2' disabled={dependDisable}><Tag color="orange" >继承参数</Tag></Radio>
                            <Radio value='3'><Tag color="orange">自定义参数</Tag></Radio>
                        </Radio.Group>
                    </Form.Item>
                    <div style={{ display: apiFiexdDispaly, width: '100%', margin: '0px 70px 0px 100px' }}>
                        <Form.Item className='item' name='apiFiexdParam' rules={apiFiexdDispaly === 'none' ? "" : rulesForm}>
                            <Input className='do' placeholder='请填写路径固定参数' />
                        </Form.Item>
                    </div>
                    <div style={{ display: apiRelyDispaly, width: '100%', margin: '0px 90px 0px 100px' }}>
                        <Form.Item className='item' style={{ width: '30%' }} name='apiRelyParamName' rules={apiRelyDispaly === 'none' ? "" : rulesForm}>
                            <Select
                                placeholder="请输入依赖的接口(依赖登入，输入login)"
                                showSearch
                                value={this.state.apiRelySearchValue}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                onSearch={this.apiRelySearch}
                                onChange={this.apiRelyChange}
                                notFoundContent={null}
                            >
                                {apiRelyPathOptions}
                            </Select>
                        </Form.Item>
                        <Form.Item className='item' style={{ width: '20%' }} name='apiRelyParamValue'>
                            <Select
                                showSearch
                                placeholder="请选择依赖的字段（依赖登入，输入路径   ）"
                                value={this.state.apiRelySearchName}
                                defaultActiveFirstOption={false}
                                showArrow={false}
                                filterOption={false}
                                notFoundContent={null}
                            >
                                {apiRelyNameOptions}
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item className='item' name='headerParam' label='Header' name='headerParamType' >
                        <Checkbox.Group onChange={e => this.headerParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2' disabled={dependDisable}><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: headerFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('headerFiexdParam', '参数名', '参数值', 'header固定参数', headerFiexdParamDisplay)}
                        </div>
                        <div style={{ width: '30%', display: headerRelyParamDisplay, margin: '0px 10px', verticalAlign: 'top' }}>
                            {second('headerRelyParam', '参数名', '依赖参数名', '依赖接口路径', 'header依赖参数', headerRelyParamDisplay)}
                        </div>
                        <div style={{ width: '30%', display: headerHandleParamDisplay, verticalAlign: 'top', }}>
                            {frist('headerHandleParam', '参数名', '默认值', 'header自定义参数', headerHandleParamDisplay)}
                        </div>
                    </div>
                    <Form.Item className='item' name='webformParamType' label='webform' >
                        <Checkbox.Group onChange={e => this.webformParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2' disabled={dependDisable}><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: webformFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('webformFiexdParam', '参数名', '参数值', 'webform固定参数', webformFiexdParamDisplay)}
                        </div>
                        <div style={{ width: '30%', display: webformRelyParamDisplay, margin: '0px 10px', verticalAlign: 'top' }}>
                            {second('webformRelyParam', '参数名', '依赖参数名', '依赖接口路径', 'webform依赖参数', webformRelyParamDisplay)}
                        </div>
                        <div style={{ width: '30%', display: webformHandleParamDisplay, verticalAlign: 'top', margin: '0px 10px', webformHandleParamDisplay }}>
                            {frist('webformHandleParam', '参数名', '默认值', 'webform自定义参数')}
                        </div>
                    </div>
                    <Form.Item className='item' name='bodyParamType' label='body' >
                        <Checkbox.Group onChange={e => this.bodyParamTypeOnChange(e)}>
                            <Checkbox value='1'><Tag color="purple">固定参数</Tag></Checkbox>
                            <Checkbox value='2' disabled={dependDisable}><Tag color="purple">继承参数</Tag></Checkbox>
                            <Checkbox value='3'><Tag color="purple">自定义参数</Tag></Checkbox>
                        </Checkbox.Group>
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '30%', display: bodyFiexdParamDisplay, verticalAlign: 'top', margin: '0px 10px', paddingRight: '35px' }}>
                            <Form.Item name='bodyFiexdParam'>
                                <Input.TextArea
                                    className='do'
                                    placeholder="基本参数格式"
                                    autoSize={{ minRows: 3, maxRows: 10 }}
                                />
                            </Form.Item>
                        </div>
                        <div style={{ width: '30%', display: bodyRelyParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {second('bodyRelyParam', '参数路径', '依赖参数名', '依赖接口路径', 'body依赖参数', bodyRelyParamDisplay)}
                        </div>
                        <div style={{ width: '30%', display: bodyHandleParamDisplay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('bodyHandleParam', '参数路径', '默认值', 'body自定义参数', bodyHandleParamDisplay)}
                        </div>
                    </div>
                    <Form.Item label='是否被依赖' className='item' name='isRely'>
                        <Switch onChange={this.isRelyOnChange} defaultChecked={this.isRely()} />
                    </Form.Item>
                    <div style={{ width: '100%', margin: '0px 90px 0px 100px' }}>
                        <div style={{ width: '50%', display: isRelyDispay, verticalAlign: 'top', margin: '0px 10px' }}>
                            {frist('relyValue', '依赖值名称', '依赖路径', '需要存起来的依赖值', isRelyDispay)}
                        </div>
                    </div>
                    <Form.Item className='item' name='responseBase' label='返回值样式'>
                        <Input.TextArea
                            className='do'
                            placeholder="返回值基本格式"
                            autoSize={{ minRows: 3, maxRows: 20 }}
                        />
                    </Form.Item>
                    <Form.Item className='item' style={{ textAlign: 'center' }} >
                        <Button type="primary" htmlType="submit" style={{ backgroundColor: 'yellow', color: 'black', margin: '0px 10px' }}>
                            提交
                        </Button>
                    </Form.Item>
                    <div style={{ height: '100px' }}>
                    </div>
                </Form>
            </Card>
        )
    }
}

