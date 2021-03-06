import React, { Component } from 'react'
import { Card, Table, Button} from 'antd'
import { PlusOutlined, FileSearchOutlined} from '@ant-design/icons'
import { getApiHomeList} from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import { responseJudge } from '../../../components/public'

export default class ReportHome extends Component {

    state = {
        total: 0,
        dataList: [],
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
                title: '执行时间',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 200,
                align: "center",
                render:(createTime)=>{
                    var dateee = new Date(createTime).toJSON();
                    return new Date(+new Date(dateee)).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
                }
            },
            {
                title: '成功率',
                dataIndex: 'success',
                key: 'success',
                align: "center",
                width: 100,
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (apiList) => {
                    return (<div >
                        <a style={{ padding: "0 5px" }}  onClick={() => this.props.history.push('/apitest/case/dotest', apiList.id)}><FileSearchOutlined /></a>
                    </div>)

                }
            }
        ]

    }

    goReportList=()=>{
        
    }
    //为第一次render准备数据
    UNSAFE_componentWillMount () {
        this.initColumns()
    }
    componentDidMount(){
        const { obj } = this.state;
        this.getApiHomeList(obj);
    }

    getApiHomeList = async(obj) =>{
        this.setState({ loading: true })
        const response = await getApiHomeList(obj)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            const dataList = result.data
            const count = result.count
            //更新状态
            this.setState({
                dataList,
                total: count
            })
        }
    }

    render() {
        const { dataList, total, loading, obj } = this.state

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
                    dataSource={dataList}
                    loading={loading}
                    bordered
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: total,
                        onChange: (pageNum) => {
                            obj.page = pageNum
                            obj.limit = PAGE_SIZE
                            this.getApiHomeList(obj)
                        }
                    }}
                />
            </Card>
        )
    }
}