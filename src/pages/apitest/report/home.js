import React, { Component } from 'react'
import { Card, Table, Button, message, Tag, Select, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getApiUriList, getApiData, delApiData, getApiForCaseData } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'

export default class ReportHome extends Component {

    state = {
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
    }


    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '报告编号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                align: "center"
            },
            {
                title: '类型',
                dataIndex: 'device',
                key: 'device',
                align: "center",
                width: 100,
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
                title: '执行时间',
                dataIndex: 'apiPath',
                key: 'apiPath',
                width: 200,
                align: "center",
            },
            {
                title: '成功率',
                dataIndex: 'apiMethod',
                key: 'apiMethod',
                align: "center",
                width: 100,
                render: apiMethod => {
                    let color
                    let value
                    if (apiMethod === '1') {
                        color = '#2db7f5'
                        value = 'GET'
                    } else if (apiMethod === '2') {
                        color = '#87d068'
                        value = 'POST'
                    } else if (apiMethod === '3') {
                        color = '#108ee9'
                        value = 'PUT'
                    }
                    return (
                        <Tag color={color} key={value}>
                            {value}
                        </Tag>
                    )

                }
            },
            {
                title: '备注',
                dataIndex: 'apiMark',
                key: 'apiMark',
                align: "center",


            },
            {
                title: '自动删除时间',
                key: 'testNum',
                align: "center",
                width: 200,
                render: (apiList) => {
                    return (
                        <div>
                            <a onClick={() => this.props.history.push('/apitest/uri/apicaselist', apiList)}>{apiList.testNum}</a>
                        </div>

                    )
                }
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

    render() {
        const { apiList, total, loading, obj } = this.state

        const extra = (

            <Button type="primary" color='pick' onClick={() => this.props.history.push('/apitest/uri/add')}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card  className='apiCaseReportList' >
                <Table
                    columns={this.columns}
                    dataSource={apiList}
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