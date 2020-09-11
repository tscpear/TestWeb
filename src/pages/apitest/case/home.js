import React, { Component } from 'react'
import { Card, Table, Button, Tag, Select, Input ,Modal} from 'antd'
import { EditOutlined, DeleteOutlined, PlayCircleOutlined } from '@ant-design/icons'
import { getApiCaseData, getApiCaseList, delApiCaseData } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import memoryUtils from '../../../utils/memoryUtils'
import { deviceNameOfList, deviceColorOfList, deviceSelect, responseJudge } from '../../../components/public'

const Option = Select.Option

export default class ApiCaseHome extends Component {
    state = {
        total: 0,
        apiCaseList: [],
        loading: false,
        selectedRowKeys: [],
        selectedTestId: [],
        obj: {
            page: 1,
            apiPath: '',
            apiCaseMark: '',
            device: '0',
            limit: PAGE_SIZE,
            apiCaseType: 0,
        },
        apiCaseData: {},
        rules: [{
            required: true,
            whitespace: true,
            message: "这你都不填，你以为你是客服吗！",
        },]
    }

    getApiCaseList = async (obj) => {
        this.setState({ loading: true })
        const response = await getApiCaseList(obj)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
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
        }
    }
    hideModal = () => {
        this.setState({
            Modalvisible: false,
        });
    };

    
    showModal = (id) => {
        this.setState({
            Modalvisible: true,
            delId: id,
        });
    };

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
                render: apiCaseLv => {
                    let color
                    let value
                    switch (apiCaseLv) {
                        case 1:
                            color = 'green';
                            value = '无关紧要';
                            break;
                        case 2:
                            color = 'blue';
                            value = '一般般啦';
                            break;
                        case 3:
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
                render: apiCaseType => {
                    let color
                    let value
                    switch (apiCaseType) {
                        case 1:
                            color = 'green';
                            value = '正常使用';
                            break;
                        case 2:
                            color = 'blue';
                            value = '重在回归';
                            break;
                        case 3:
                            color = 'red';
                            value = '创建数据';
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
                        {/* <a style={{ padding: "0 5px" }} onClick={() => this.addCase(apiCaseList.id)}><PlusOutlined /></a> */}
                        <a style={{ padding: "0 5px" }} onClick={() => this.goToCase(apiCaseList.id)} style={{ padding: "0 5px" }}><EditOutlined /></a>
                        <a style={{ padding: "0 5px" }} onClick={() => this.showModal(apiCaseList.id)}><DeleteOutlined twoToneColor="red" />
                        </a>
                    </div>)

                }
            }
        ]

    }

    delApi = async () => {
        const {obj,delId} = this.state;
        const userId = memoryUtils.user.id;
        this.setState({ loading: true })
        const response = await delApiCaseData(delId, userId)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            this.getApiCaseList(obj);
            this.hideModal();
        }
    }

    goToCase = async (id) => {
        const userId = memoryUtils.user.id;
        this.setState({ loading: true });
        const response = await getApiCaseData(id, userId)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            const apiCaseData = result.data;
            this.props.history.push('/apitest/case/update', apiCaseData);
        }
    }

    //为第一次render准备数据
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    //执行异步任务
    componentDidMount() {
        const { obj } = this.state
        const apiList = this.props.location.state;
        if (apiList) {
            const apiPath = apiList.apiPath;
            obj.apiPath = apiPath;
            obj.apiId = apiList.id;
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
        } else if (type === 4) {
            obj.apiCaseType = value;
        }
        this.setState({ obj: obj })
        this.getApiCaseList(obj)


    }

    deviceChange = (value) => {
        this.rearchChange(value, 1)

    }
    apiCaseLvChange = (value) => {
        this.rearchChange(value, 4);
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
    onSelectChange = selectedRowKeys => {
        const { apiCaseList } = this.state;
        let selectedTestId = [];
        selectedRowKeys.map(item => {
            selectedTestId.push(apiCaseList[item].id)
        })
        this.setState({ selectedRowKeys, selectedTestId });
    };


    render() {

        const { apiCaseList, loading, total, obj, selectedTestId, selectedRowKeys
        } = this.state;
        const title = (
            <span>
                <Select style={{ width: 150, margin: "0 15px 0 0" }} value={obj.device} onChange={this.deviceChange}>
                    <Option value='0'>请选择设备</Option>
                    {deviceSelect()}
                </Select>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='路径' value={obj.apiPath} onChange={event => this.apiPathChange(event)} className='do'>
                </Input>
                <Input style={{ width: 200, margin: "0 15px" }} placeholder='描述' value={obj.apiCaseMark} onChange={event => this.apiCaseMarkChange(event)} className='do'>
                </Input>
                <Select style={{ width: 150, margin: "0 15px " }} value={obj.apiCaseType} onChange={this.apiCaseLvChange}>
                    <Option value={0}>请选择用例类型</Option>
                    <Option value={1}>正常使用</Option>
                    <Option value={2}>重在回归</Option>
                    <Option value={3}>创建数据</Option>
                </Select>
                <Button type="primary" onClick={() => this.clear()}>
                    清空
        </Button>
            </span>
        )
        const rowSelection = {
            onChange: this.onSelectChange,

        };


        const extra = (
            <div>
                <Button type="primary" onClick={() => this.props.history.push('/apitest/case/dotest', selectedTestId)} disabled={
                    selectedRowKeys.length === 0 ? true : false
                }>
                    <PlayCircleOutlined />
                执行用例
            </Button>
            <Modal
                   
                   visible={this.state.Modalvisible}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}
                   keyboard={true}
                   onOk={this.delApi}
                   onCancel={this.hideModal}
                   okText="确定"
                   cancelText="取消"
               >
                   <p style={{fontSize:"16px"}}>确定删除该流程？</p>
               </Modal>
            </div>

        )
        const showTotal = (total, range) => {
            return "共 " + total + " 条"
        }

        return (
            <Card title={title} className='apihomep apiCaseList' extra={extra}>
                <Table
                    rowSelection={{ ...rowSelection }}
                    columns={this.columns}
                    dataSource={apiCaseList}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        pageSizeOptions: ['10', '20', '50', '100', '200', '500', '1000', '5000'],
                        showSizeChanger: true,
                        showTotal: showTotal,
                        onChange: (pageNum, pageSize) => {
                            obj.page = pageNum
                            obj.limit = pageSize
                            this.getApiCaseList(obj)
                        },
                        onShowSizeChange: (current, size) => {
                            obj.page = 1
                            obj.limit = size
                            this.getApiCaseList(obj)
                        }
                    }}
                />
            </Card>
        )
    }

}