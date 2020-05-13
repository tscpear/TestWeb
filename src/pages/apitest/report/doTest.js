import React, { Component } from "react";
import './../index.less'
import {
    Card, Form, Input, Select, Button, Popconfirm, Modal, Table,
    Tag, Radio, Checkbox, Row, Col, Switch, message, Drawer, List, Avatar, Divider, Collapse
} from 'antd'
import { LockOutlined, SendOutlined, SyncOutlined, FileSearchOutlined, ItalicOutlined, PlusOutlined, CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { PAGE_SIZE } from '../../../utils/constants'
import { getApiReport, putToken, doTest, getOneReport } from '../../../api/index'

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
        environment: "uat",
        visible: false,
        requestData: {
            apiPath: "asdqweqe",
            headerParam: [],
            webformParam: [],
            bodyParam: [],

        }
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
                width: 80,
                render: device => {
                    let color
                    let value
                    switch (device) {
                        case '1':
                            color = 'black';
                            value = '知轮后台';
                            break;
                        case '2':
                            color = 'green';
                            value = '知轮商家';
                            break;
                        case '3':
                            color = '#EE7621';
                            value = '司机端程序';
                            break;
                        case '4':
                            color = '#B23AEE';
                            value = '知轮车服';
                            break;
                        case '5':
                            color = '#FFBBFF';
                            value = '分仓终端';
                            break;
                        default:
                            break;
                    }
                    return (
                        <Tag color={color} key={value}>
                            {value}
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
            },
            {
                title: '路径',
                dataIndex: 'apiPath',
                key: 'apiPath',
            },
            {
                title: '描述',
                dataIndex: 'apiCaseMark',
                key: 'apiCaseMark',
            },
            {
                title: '执行结果',
                dataIndex: 'resultStatus',
                key: 'resultStatus',
                align: "center",
                render: (resultStatus, apiReport) => {
                    if (resultStatus) {
                        if (resultStatus == 1) {
                            return (
                                <a style={{ padding: "0 5px" }} onClick={() => this.showDrawer(apiReport)}><CheckCircleTwoTone twoToneColor="#52c41a" /></a>)
                        } else {
                            return (
                                <a style={{ padding: "0 5px" }} onClick={() => this.showDrawer(apiReport)}><CloseCircleTwoTone twoToneColor="red" /></a>);
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
            tokenData = { "testList": [], "groupId": testIdList }
        } else {
            tokenData = { "testList": testIdList, "groupId": 0 }
        }

        this.setState({ tokenData });
        this.getApiReport(tokenData)
    }


    getApiReport = async (tokenData) => {
        this.setState({ loading: true })
        const response = await getApiReport(tokenData)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
            const apiReport = result.data
            const count = result.count
            apiReport.map((item, index) => {
                item.key = index
            })
            //更新状态
            this.setState({
                apiReport,
                total: count
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
        const { environment, tokenData } = this.state;
        let value = Object.assign(tokenData, { "environment": environment });
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
        const { environment, tokenData } = this.state;
        let value = Object.assign(tokenData, { "environment": environment });
        this.setState({ loading: true })
        const response = await doTest(value)
        this.setState({ loading: false })
        const result = response.data
        const msg = result.msg


        if (result.code === 1) {
            const data = result.data;
            this.setState({ apiReport: data })
            message.success(msg);
        } else {
            message.error(msg)
        }
    }

    showDrawer = async (apiReport) => {
        await this.getOneReport(apiReport.testId, apiReport.reportId);
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    getOneReport = async (testId, reportId) => {
        this.setState({ loading: true })
        const response = await getOneReport(testId, reportId)
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

        const { data, apiReport, total, loading, obj, requestData } = this.state;



        const phoneList = (item) => {
            let device;
            let deviceType;
            let phone = item[2];
            switch (item[0]) {
                case '1':
                    device = '管理后台';
                    break;
                case '2':
                    device = '知轮商家';
                    break;
            }
            switch (item[1]) {
                case '1':
                    deviceType = '网红/取货点/服务车';
                    break;
            }
            return (
                <div >
                    <div style={{ display: 'inline-block', width: '20%' }}>{device}</div>
                    <div style={{ display: 'inline-block', width: '50%' }}>{deviceType}</div>
                    <div style={{ display: 'inline-block', width: '20%' }}>{phone}</div>
                </div>
            )
        }



        const extra = (
            <div>
                <Button type='primary' onClick={this.showModal} style={{ backgroundColor: '#9BCD9B', border: '1px solid #9BCD9B' }}>
                    <SyncOutlined spin />涉及账号
                 </Button>
                <Button type='primary' style={{ backgroundColor: 'orange', border: '1px solid orange', margin: '0px 20px' }} onClick={this.putToken}>
                    <LockOutlined />固定token
                </Button>
                <Select autoFocus='true' style={{ width: '100px' }} defaultValue='uat' onChange={this.environmentOnChange}>
                    <Select.Option value='uat'>准生产</Select.Option>
                    <Select.Option value='tests'>测试次</Select.Option>
                    <Select.Option value='test'>测试主</Select.Option>
                </Select>
                <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.doTest}>
                    <SendOutlined />执行用例
                </Button>
                <Modal
                    title="涉及账号"
                    visible={this.state.Modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                    keyboard={true}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                >
                    {data.map(item => {
                        return phoneList(item);
                    })}
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

        return (
            <Card className='doTest myform' extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={apiReport}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        onChange: (pageNum) => {
                            obj.page = pageNum
                            obj.limit = PAGE_SIZE
                            this.getUriList(obj)
                        }
                    }}
                />
                <Drawer
                    width={640}
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
                            <Table
                                columns={dColumns}
                                dataSource={requestData.bodyParam}
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