import React, { Component } from 'react'
import { Card, Table, Button, message, Tag, Select, Input } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { getApiCaseData, getApiCaseList } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'

const Option = Select.Option

export default class ApiCaseHome extends Component {
    state = {
        total: 0,
        apiCaseList: [],
        loading: false,
        obj: {
            page: 1,
            apiPath: '',
            apiCaseMark: '',
            device: '0',
            limit: PAGE_SIZE
        },
        apiCaseData: {},
    }

    getApiCaseList = async (obj) => {
        this.setState({ loading: true })
        const response = await getApiCaseList(obj)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
            const apiCaseList = result.data
            const count = result.count
            apiCaseList.map((item, index) => {
                item.key = index
            })
            //更新状态
            this.setState({
                apiCaseList,
                total: count
            })
        } else {
            const msg = result.msg
            message.error(msg)
        }
    }


    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '用例编号',
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
                title: '描述',
                dataIndex: 'apiCaseMark',
                key: 'apiCaseMark',
            },
            {
                title: '用例等级',
                dataIndex: 'apiCaseLv',
                key: 'apiCaseLv',
                width: 100,
                align: "center",
                render: apiCaseLv =>{
                    let color
                    let value
                    switch(apiCaseLv){
                        case '1':
                            color = 'green';
                            value = '无关紧要';
                            break;
                        case '2':
                            color = 'blue';
                            value = '一般般啦';
                            break;
                        case '3':
                            color = 'red';
                            value = '叼的一匹';
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
                title: '用例类型',
                dataIndex: 'apiCaseType',
                key: 'apiCaseType',
                width: 100,
                align: "center",
                render: apiCaseType =>{
                    let color
                    let value
                    switch(apiCaseType){
                        case '1':
                            color = 'green';
                            value = '任意使用';
                            break;
                        case '2':
                            color = 'blue';
                            value = '仅限流程';
                            break;
                        case '3':
                            color = 'red';
                            value = '内部消耗';
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
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (apiCaseList) => {
                    return (<div >
                        <a style={{ padding: "0 5px" }} onClick={() => this.addCase(apiCaseList.id)}><PlusOutlined /></a>
                        <a style={{ padding: "0 5px" }} onClick={() => this.goToCase(apiCaseList.id)} style={{ padding: "0 5px" }}><EditOutlined /></a>
                        <a style={{ padding: "0 5px" }} onClick={() => this.delApi(apiCaseList.id)}><DeleteOutlined twoToneColor="red" />
                        </a>
                    </div>)

                }
            }
        ]

    }
    goToCase = async (id) => {
        this.setState({ loading: true })
        const response = await getApiCaseData(id)
        this.setState({ loading: false })
        const result = response.data
        if (result.code === 1) {
            const apiCaseData = result.data;
            this.props.history.push('/apitest/case/update', apiCaseData);
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
        const apiList = this.props.location.state;
        if(apiList){
            const apiPath = apiList.apiPath;
            obj.apiPath = apiPath;
        }
        this.getApiCaseList(obj)
    }

    rearchChange = (value, type) => {
        const { obj } = this.state
        obj.page = 1
        if (type === 1) {
            obj.device = value
        } else if (type === 2) {
            obj.apiPath = value.target.value
        } else if (type === 3) {
            obj.apiCaseMark = value.target.value
        }
        this.setState({ obj: obj })
        console.log(this.state.obj)
        this.getApiCaseList(obj)


    }

    deviceChange = (value) => {
        this.rearchChange(value, 1)
    }
    apiPathChange = (value) => {
        this.rearchChange(value, 2)
    }
    apiCaseMarkChange = (value) => {
        this.rearchChange(value, 3)
    }
    clear = () => {
        const { obj } = this.state
        obj.device = '0'
        obj.apiPath = ''
        obj.apiCaseMark = ''
        this.setState({ obj: obj })
        this.getApiCaseList(obj)
    }


    render() {

        const { apiCaseList, loading, total, obj } = this.state;
        const title = (
            <span>
                <Select style={{ width: 150 }} value={obj.device} onChange={this.deviceChange}>
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
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='路径' value={obj.apiPath} onChange={event => this.apiPathChange(event)} className='do'>
                </Input>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='描述' value={obj.apiCaseMark} onChange={event => this.apiCaseMarkChange(event)} className='do'>
                </Input>
                <Button type="primary" onClick={() => this.clear()}>
                    清空
        </Button>
            </span>
        )
        return (
            <Card title={title} className='apihomep apiCaseList' >
                <Table
                    columns={this.columns}
                    dataSource={apiCaseList}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        onChange: (pageNum) => {
                            obj.page = pageNum
                            obj.limit = PAGE_SIZE
                            this.getApiCaseList(obj)
                        }
                    }}
                />
            </Card>
        )
    }

}