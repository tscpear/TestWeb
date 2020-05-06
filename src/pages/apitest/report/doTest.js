import React, { Component } from "react";
import './../index.less'
import {
    Card, Form, Input, Select, Button, Popconfirm, Modal, Table,
    Tag, Radio, Checkbox, Row, Col, Switch, message
} from 'antd'
import { LockOutlined, SendOutlined, SyncOutlined, ExclamationCircleOutlined, ItalicOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PAGE_SIZE } from '../../../utils/constants'
import { getApiReport } from '../../../api/index'


export default class DoTest extends Component {
    state = {
        visible: false,
        data: [['1', '1', '13588096710'], ['1', '1', '13588096710'], ['1', '1', '13588096710']],
        total: 0,
        apiList: [],
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

    };


    hideModal = () => {
        this.setState({
            visible: false,
        });
    };
    showModal = () => {
        this.setState({
            visible: true,
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
                dataIndex: 'path',
                key: 'path',
                align: "center",
            },
            {
                title: '描述',
                dataIndex: 'mark',
                key: 'mark',
                align: "center",
            },
            {
                title: '执行结果',
                dataIndex: 'result',
                key: 'result',
                align: "center",


            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (apiList) => {
                    return (<div >
                        <a style={{ padding: "0 5px" }} onClick={() => this.addCase(apiList.id)}><PlusOutlined /></a>
                        <a onClick={() => this.goToApi(apiList.id)} style={{ padding: "0 5px" }}><EditOutlined /></a>
                        <a style={{ padding: "0 5px" }} onClick={() => this.delApi(apiList.id)}><DeleteOutlined twoToneColor="red" />
                        </a>
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
        const testIdList = this.props.location.state;
        this.getApiReport(testIdList)
    }


    getApiReport = async (testIdList) => {
        this.setState({ loading: true })
        const response = await getApiReport(testIdList)
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
    render() {

        const { data, apiReport, total, loading, obj } = this.state;



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
                <Button type='primary' style={{ backgroundColor: 'orange', border: '1px solid orange', margin: '0px 20px' }}>
                    <LockOutlined />固定token
                </Button>
                <Select autoFocus='true' style={{ width: '100px' }} defaultValue='1'>
                    <Select.Option value='1'>准生产</Select.Option>
                    <Select.Option value='2'>测试次</Select.Option>
                    <Select.Option value='3'>测试主</Select.Option>
                </Select>
                <Button type='primary' style={{ marginLeft: '20px' }}>
                    <SendOutlined />执行用例
                </Button>
                <Modal
                    title="涉及账号"
                    visible={this.state.visible}
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
            </Card>
        )
    }
}