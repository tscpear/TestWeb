import React, { Component } from 'react'
import { Card, Table, Button, Tag, Select, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getApiUriList, getApiData, delApiData, getApiForCaseData } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'
import storageUtils from '../../../utils/storageUtils'

import { deviceNameOfList, deviceColorOfList, deviceSelect,responseJudge} from '../../../components/public'
export default class UriHome extends Component {



    state = {
        total: 0,
        apiList: [],
        loading: false,
        obj: {
            page: 1,
            apiPath: '',
            apiMark: '',
            device: 0,
            limit: PAGE_SIZE
        },
        apiData: {},
        userList:[],
    }




    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '接口编号',
                dataIndex: 'id',
                key: 'id',
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
                title: '接口路径',
                dataIndex: 'apiPath',
                key: 'apiPath',
            },
            {
                title: '请求方法',
                dataIndex: 'apiMethod',
                key: 'apiMethod',
                align: "center",
                width: 100,
                render: apiMethod => {
                    let color
                    let value
                    if (apiMethod === 1) {
                        color = '#2db7f5'
                        value = 'GET'
                    } else if (apiMethod === 2) {
                        color = '#87d068'
                        value = 'POST'
                    } else if (apiMethod === 3) {
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
                title: '描述',
                dataIndex: 'apiMark',
                key: 'apiMark',


            },
            {
                title: '用例数量',
                key: 'testNum',
                align: "center",
                width: 100,
                render: (apiList) => {
                    return (
                        <div>
                            <a onClick={() => this.props.history.push('/apitest/uri/apicaselist', apiList)}>{apiList.testNum}</a>
                        </div>

                    )
                }
            },
            {
                title: '创建人',
                dataIndex: 'createUserId',
                key: 'createUserId',
                align: "center",
                width: 100,
                render: (createUserId) => {
                    const userList = this.state.userList;
                    return userList[createUserId-1].name;
                    
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

    



    addCase = async (id) => {
        const userId = memoryUtils.user.id;
        this.setState({ loading: true })
        const response = await getApiForCaseData(id, userId)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if(result){
            const apiForCaseData = result.data;
            this.props.history.push('/apitest/uri/addcase', apiForCaseData);
        }
    }

    delApi = async (id) => {
        const user = memoryUtils.user
        const ids = { 'id': id, 'userId': user.id }
        this.setState({ loading: true })
        const response = await delApiData(ids)
        const result = responseJudge(response);
        if (result) {
            const { obj } = this.state
            this.getUriList(obj)
        }
    }

    goToApi = async (id) => {
        this.setState({ loading: true })
        const response = await getApiData(id)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            const apiData = result.data;
            this.props.history.push('/apitest/uri/updata', apiData);
        } 
    }

    getUriList = async (obj) => {
        this.setState({ loading: true })
        const response = await getApiUriList(obj)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            const apiList = result.data
            const count = result.count
            apiList.map((item, index) => {
                item.key = index
            })
            //更新状态
            this.setState({
                apiList,
                total: count
            })
        } 
    }

    //为第一次render准备数据
    UNSAFE_componentWillMount() {
        const userList = storageUtils.getData("user_list");
        this.setState({userList})
        this.initColumns()
    }
    //执行异步任务
    componentDidMount() {
        const { obj } = this.state
        this.getUriList(obj)
       

    }

    rearchChange = (value, type) => {
        const { obj } = this.state
        obj.page = 1
        if (type === 1) {
            obj.device = value
        } else if (type === 2) {
            obj.apiPath = value.target.value
        } else if (type === 3) {
            obj.apiMark = value.target.value
        }
        this.setState({ obj: obj })
        this.getUriList(obj)


    }
    deviceChange = (value) => {
        this.rearchChange(value, 1)
    }
    apiPathChange = (value) => {
        this.rearchChange(value, 2)
    }
    apiMarkChange = (value) => {
        this.rearchChange(value, 3)
    }
    clear = () => {
        const { obj } = this.state
        obj.device = 0
        obj.apiPath = ''
        obj.apiMark = ''
        this.setState({ obj: obj })
        this.getUriList(obj)
    }

    render() {


        const { apiList, total, loading, obj } = this.state
        const title = (
            <span>
                <Select style={{ width: 150 }} value={obj.device} onChange={this.deviceChange}>
                    <Select.Option value={0}>请选择设备</Select.Option>
                    {deviceSelect()}
                </Select>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='路径' value={obj.apiPath} onChange={event => this.apiPathChange(event)} className='do'>
                </Input>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='描述' value={obj.apiMark} onChange={event => this.apiMarkChange(event)} className='do'>
                </Input>
                <Button type="primary" onClick={() => this.clear()}>
                    清空
                </Button>
            </span>
        )
        const extra = (

            <Button type="primary" color='pick' onClick={() => this.props.history.push('/apitest/uri/add')}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card title={title} extra={extra} className='apihomep' >
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