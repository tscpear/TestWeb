import React, { Component } from 'react'
import { Card, Table, Button, message, Tag, Select, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getApiUriList, getApiData, delApiData, getApiForCaseData } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'

const Option = Select.Option


export default class UriHome extends Component {



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
                title: '描述',
                dataIndex: 'apiMark',
                key: 'apiMark',


            },
            {
                title: '用例数量',
                dataIndex: 'testNum',
                key: 'testNum',
                align: "center",
                width: 100
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
        this.setState({ loading: true })
        const response = await getApiForCaseData(id)
        this.setState({ loading: false })
        const result = response.data;
        if (result.code === 1) {
            const apiForCaseData = result.data;
            this.props.history.push('/apitest/uri/addcase', apiForCaseData);
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }

    delApi = async (id) => {
        const user = memoryUtils.user
        const ids = { 'id': id, 'userId': user.id }
        this.setState({ loading: true })
        const response = await delApiData(ids)
        const result = response.data
        if (result.code === 1) {
            const { obj } = this.state
            this.getUriList(obj)
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }

    goToApi = async (id) => {
        this.setState({ loading: true })
        console.log("你妈妈吗")
        const response = await getApiData(id)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
            const apiData = result.data;
            this.props.history.push('/apitest/uri/updata', apiData);
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }

    getUriList = async (obj) => {
        this.setState({ loading: true })
        const response = await getApiUriList(obj)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
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
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }

    //为第一次render准备数据
    componentWillMount() {
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
        console.log(this.state.obj)
        this.getUriList(obj)


    }
    handleChange = (value) => {
        this.rearchChange(value, 1)
    }
    uriValueChange = (value) => {
        this.rearchChange(value, 2)
    }
    uriMarkChange = (value) => {
        this.rearchChange(value, 3)
    }
    clear = () => {
        const { obj } = this.state
        obj.device = '0'
        obj.apiPath = ''
        obj.apiMark = ''
        this.setState({ obj: obj })
        this.getUriList(obj)
    }

    render() {


        const { apiList, total, loading, obj } = this.state
        const title = (
            <span>
                <Select style={{ width: 150 }} defaultValue={obj.device} onChange={this.handleChange}>
                    <Option value='0'>请选择设备</Option>
                    <Option value='1'>知轮后台</Option>
                    <Option value='2'>知轮商家</Option>
                    <Option value='3'>车服小程序</Option>
                    <Option value='4'>知轮车服</Option>
                    <Option value='5'>分仓终端</Option>
                    <Option value='6'>商城后台</Option>
                    <Option value='7'>店铺后台</Option>
                    <Option value='8'>知轮三包</Option>
                    <Option value='9'>知轮通</Option>
                    <Option value='10'>知轮互联</Option>
                    <Option value='11'>车服H5</Option>
                    <Option value='12'>知轮车队</Option>
                </Select>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='路径' value={obj.apiPath} onChange={event => this.uriValueChange(event)} className='do'>
                </Input>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='描述' value={obj.apiMark} onChange={event => this.uriMarkChange(event)} className='do'>
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