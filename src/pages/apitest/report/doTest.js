import React, { Component } from "react";
import './../index.less'
import {
    Card, Form, Input, Select, Button, Popconfirm, Modal, Table,
    Tag, Radio, Checkbox, Row, Col, Switch, message, Drawer, List, Avatar, Divider, Collapse
} from 'antd'
import { LockOutlined, SendOutlined, SyncOutlined, FileSearchOutlined, ItalicOutlined, PlusOutlined, CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { PAGE_SIZE } from '../../../utils/constants'
import { getApiReport, putToken, doTest, getOneReport, getReportResultTable, getAccountList } from '../../../api/index'
import storageUtils from '../../../utils/storageUtils'
import { deviceNameOfList, deviceColorOfList, deviceSelect } from '../../../components/public'

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);


export default class DoTest extends Component {
    state = {
        Modalvisible: false,
        data: [['1', '1', '13588096710'], ['1', '1', '13588096710'], ['1', '1', '13588096710']],
        total: 0,
        loading: false,
        obj: {
            page: 1,
            apiPath: '',
            apiMark: '',
            device: '0',
            limit: PAGE_SIZE
        },
        apiData: {},
        apiReport: [],
        testList: [],
        groupId: 0,
        environment: 1,
        visible: false,
        requestData: {
            apiPath: "asdqweqe",
            headerParam: [],
            webformParam: [],
            bodyParam: [],

        },
        responseValueExpectResult: [],
        reportId: 0,
        dotestName: '执行用例',
        account: [],
        accountValue: [],

    };


    hideModal = () => {
        this.setState({
            Modalvisible: false,
        });
    };
    showModal = () => {
        this.setState({
            Modalvisible: true,
        });
    };
    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '用例编号',
                dataIndex: 'testId',
                key: 'testId',
                width: 100,
                align: "center"
            },
            {
                title: '设备',
                dataIndex: 'device',
                key: 'device',
                align: "center",
                width: 100,
                render: device => {
                    return (
                        <Tag color={deviceColorOfList(device)} key={device}>
                            {deviceNameOfList(device)}
                        </Tag>
                    )

                }
            },
            {
                title: '角色',
                dataIndex: 'deviceType',
                key: 'deviceType',
                width: 200,
                align: "center",
                render: (deviceType,data) => {
                    const account = this.state.account;
                    if (account.length > 0) {
                        return (account.map((item) => {
                           if(item.device == data.device && item.deviceType == data.deviceType){
                                return item.deviceTypeName
                           }
                        }))
                    }

                }
            },
            {
                title: '路径',
                dataIndex: 'apiPath',
                key: 'apiPath',
            },
            {
                title: '状态码',
                dataIndex: 'actStatus',
                key: 'actStatus',
            },
            {
                title: '执行结果',
                dataIndex: 'resultMain',
                key: 'resultMain',
                align: "center",
                render: (resultMain, apiReport) => {
                    if (resultMain != null) {
                        if (resultMain == 0) {
                            return (
                                <a style={{ padding: "0 5px" }} onClick={() => this.showDrawer(apiReport)}><CheckCircleTwoTone twoToneColor="#52c41a" /></a>)
                        } else if (resultMain == 1) {
                            return (
                                <a style={{ padding: "0 5px" }} onClick={() => this.showDrawer(apiReport)}> <Tag color="red">
                                    状态码与期望不一致
                                </Tag></a>);
                        } else if (resultMain == 2) {
                            return (
                                <a style={{ padding: "0 5px", color: "red" }} onClick={() => this.showDrawer(apiReport)}><Tag color="red">
                                    返回结构与期望不一致
                               </Tag></a>);
                        } else if (resultMain == 3) {
                            return (
                                <a style={{ padding: "0 5px", color: "red" }} onClick={() => this.showDrawer(apiReport)}><Tag color="red">
                                    返回值与期望不一致
                               </Tag></a>);
                        }
                    }

                }


            },

            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (apiReport) => {
                    return (<div >
                        <a style={{ padding: "0 5px" }} onClick={() => this.showDrawer(apiReport)}><FileSearchOutlined /></a>
                    </div>)

                }
            }
        ]

    }
    //为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }



    //执行异步任务
    componentDidMount() {
        let tokenData
        const testIdList = this.props.location.state;
        if (typeof testIdList === "number") {
            if (testIdList < 10000) {
                tokenData = { "testList": [], "groupId": testIdList, "reportId": 0 }
            } else {
                tokenData = { "testList": [], "groupId": 0, "reportId": testIdList }
                this.setState({ dotestName: '重新执行' });
            }

        } else {
            tokenData = { "testList": testIdList, "groupId": 0, "reportId": 0 }
        }
        this.setState({ tokenData });
        this.getApiReport(tokenData);
        this.getAccount(tokenData);
    }

    getAccount = async (tokenData) => {
        const { environment, reportId } = this.state;
        if (reportId != 0) {
            tokenData.reportId = reportId;
        }
        let value = Object.assign(tokenData, { "environment": environment });
        var response = await getAccountList(value)
        var result = response.data;
        var account = result.data;

        var accountValue = [];
        account.map((item, index) => {
            accountValue[index] = item.device + '.' + item.deviceType + '.' + 1
        });
        this.setState({ account, accountValue })

    }


    getApiReport = async (tokenData) => {
        this.setState({ loading: true })
        var response;
        if (tokenData.reportId > 10000) {
            response = await getReportResultTable(tokenData);
        } else {
            response = await getApiReport(tokenData)
        }

        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
            const apiReport = result.data.list;
            const count = result.count
            apiReport.map((item, index) => {
                item.key = index
            })
            //更新状态
            this.setState({
                apiReport,
                total: count,
            })
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }


    environmentOnChange = (value) => {
        this.setState({ environment: value })
    }
    putToken = async () => {
        const { environment, accountValue } = this.state;

        let value = { "environment": environment, "accountValue": accountValue };
        this.setState({ loading: true })
        const response = await putToken(value)
        this.setState({ loading: false })
        const result = response.data
        const msg = result.msg
        if (result.code === 1) {

            message.success(msg);

        } else {
            message.error(msg)
        }
    }
    doTest = async () => {
        const { environment, tokenData, reportId, accountValue } = this.state;
        if (reportId != 0) {
            tokenData.reportId = reportId;
        }
        let value = Object.assign(tokenData, { "environment": environment, "accountValue": accountValue });
        this.setState({ loading: true })
        const response = await doTest(value)
        this.setState({ loading: false })
        const result = response.data
        const msg = result.msg


        if (result.code === 1) {
            const data = result.data;
            const list = data.list;
            const reportId = data.reportId;
            this.setState({ apiReport: list, reportId: reportId, dotestName: '重新执行' })
            message.success(msg);
        } else {
            message.error(msg)
        }
    }


    showDrawer = async (apiReport) => {
        await this.getOneReport(apiReport.id);
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    getOneReport = async (id) => {
        this.setState({ loading: true })
        const response = await getOneReport(id)
        this.setState({ loading: false })
        const result = response.data
        if (result.code == 1) {
            const data = result.data;
            this.setState({ requestData: data });
        } else {
            message.error(result.msg);
        }

    };
    /**
     * 修改测试账户的方法
     * @param {*} json 
     */
    onChangeAccount = (value, device, deviceType, index) => {
        const accountValue = this.state.accountValue;
        accountValue[index] = device + '.' + deviceType + '.' + value
        this.setState({ accountValue })
    }

    /**
     * json展示方法
     */
    jsonFormat = (json) => {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span>' + match + '</span>';
        });
    }

    render() {

        const { data, apiReport, total, loading, obj, requestData, responseValueExpectResult, dotestName, account } = this.state;
        const environmentItem = storageUtils.getData('environment_key')




        const phoneList = (item, index) => {

            return (
                <div style={{ margin: '10px 0px' }}>
                    <div style={{ display: 'inline-block', width: '20%' }}>{item.deviceName}</div>
                    <div style={{ display: 'inline-block', width: '30%' }}>{item.deviceTypeName}</div>
                    <div style={{ display: 'inline-block', width: '50%' }}>
                        <Select autoFocus='true' style={{ width: '200px' }} defaultValue={1} onChange={(value) => this.onChangeAccount(value, item.device, item.deviceType, index)}>
                            {item.accountList.map((item, index) => (
                                <Select.Option value={index + 1}>{item}</Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
            )
        }



        const extra = (
            <div>
                <Button type='primary' onClick={this.showModal} style={{ backgroundColor: '#9BCD9B', border: '1px solid #9BCD9B' }}>
                    <SyncOutlined spin />账号与环境
                 </Button>

                <Input style={{ width: '100px', margin: '0px 0px 0px 20px' }} value={environmentItem[this.state.environment - 1]} />
                <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.doTest}>
                    <SendOutlined />{dotestName}
                </Button>

                <Modal
                    title="账号与环境"
                    visible={this.state.Modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                    keyboard={true}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                >
                    <div>
                        <Select autoFocus='true' style={{ width: '100px' }} defaultValue={1} onChange={this.environmentOnChange}>
                            {environmentItem.map((item, index) => (
                                <Select.Option value={index + 1}>{item}</Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div style={{ margin: '20px 0px 0px 0px' }}>
                        {account.map((item, index) => {
                            return phoneList(item, index);
                        })}
                    </div>
                    <Button type='primary' style={{ backgroundColor: 'orange', border: '1px solid orange' }} onClick={this.putToken}>
                        <LockOutlined />固定token
                </Button>
                </Modal>
            </div>

        )

        const dColumns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'value',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        const expectColumns = [
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
            },
            {
                title: '期望值',
                dataIndex: 'expectValue',
                key: 'expectValue',
            },
            {
                title: '实际值',
                dataIndex: 'actValue',
                key: 'actValue',
            },
        ];
        const showTotal = (total, range) => {

            return "共 " + total + " 条"
        }

        return (
            <Card className='doTest myform' extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={apiReport}
                    loading={loading}
                    bordered
                    size="small"

                />
                <Drawer
                    width={'60%'}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 请求路径</p>
                    <p className="site-description-item-profile-p">{requestData.apiMethod}      {requestData.apiPath}</p>
                    <Divider style={{ backgroundColor: "green" }} />

                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 请求参数</p>
                    <Collapse bordered={false} style={{ backgroundColor: "#fff" }}>
                        <Collapse.Panel header="请求头参数" key="1" showArrow={false}>
                            <Table
                                columns={dColumns}
                                dataSource={requestData.headerParam}
                                size="small"
                                pagination={false}

                            />

                        </Collapse.Panel>
                        <Collapse.Panel header="form表单参数" key="2" showArrow={false}>
                            <Table
                                columns={dColumns}
                                dataSource={requestData.webformParam}
                                size="small"
                                pagination={false}>

                            </Table>
                        </Collapse.Panel>
                        <Collapse.Panel header="body参数" key="3" showArrow={false}>
                            <pre><code id="json">  {JSON.stringify(requestData.bodyParam, undefined, 2)}</code></pre>
                        </Collapse.Panel>
                    </Collapse>
                    <Divider style={{ backgroundColor: "green" }} />
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 期望断言</p>
                    <Collapse bordered={false} style={{ backgroundColor: "#fff" }}>
                        <Collapse.Panel header="状态码期望值" key="1" showArrow={false}>
                            <Row>
                                <Col span={12}>
                                    <DescriptionItem title="期望状态码" content={requestData.expectStatus} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionItem title="实际状态码" content={requestData.actStatus} />
                                </Col>
                            </Row>
                        </Collapse.Panel>
                        <Collapse.Panel header="返回值期望" key="2" showArrow={false}>
                            <Table
                                columns={expectColumns}
                                dataSource={requestData.responseValueExpectResult}
                                size="small"
                                pagination={false}>

                            </Table>
                        </Collapse.Panel>
                    </Collapse>
                    <Divider style={{ backgroundColor: "green" }} />
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 返回值</p>
                    <pre><code id="json">  {JSON.stringify(requestData.response, undefined, 2)}</code></pre>
                </Drawer>
            </Card>
        )
    }
}