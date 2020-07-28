import React, { Component } from 'react'
import { Card, Table, Button} from 'antd'
import { PlusOutlined,RedoOutlined} from '@ant-design/icons'
import { getApiGroupList } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../index.less'
import { responseJudge } from '../../../components/public'

export default class GroupHome extends Component{
    state = {
        total: 0,
        list: [],
        loading: false,
        obj: {
            page: 1,
            apiPath: '',
            apiMark: '',
            device: '0',
            limit: PAGE_SIZE
        },
        data: {},
    }


    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '用例组编号',
                dataIndex: 'id',
                key: 'id',
                width: 100,
                align: "center"
            },
            {
                title: '类型',
                dataIndex: 'groupType',
                key: 'groupType',
                align: "center",
                width: 100,
            },
            {
                title: '描述',
                dataIndex: 'groupMark',
                key: 'groupMark',
                width: 200,
                align: "center",
            },
            {
                title: '涉及账号',
                dataIndex: 'userType',
                key: 'userType',
                align: "center",
                width: 100,
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (list) => {
                    return (<div >
                        <a style={{ padding: "0 5px" }} onClick={() =>  this.props.history.push('/apitest/case/dotest',list.testList)}><RedoOutlined spin style={{color:"#eb2f96"}}/></a>
                        
                    </div>)

                }
            }
        ]

    }
  //执行异步任务
  componentDidMount() {
    const { obj } = this.state
    const apiList = this.props.location.state;
    if (apiList) {
        const apiPath = apiList.apiPath;
        obj.apiPath = apiPath;
    }
    this.getApiGroupList(obj)
}


    getApiGroupList = async(obj) =>{
        this.setState({ loading: true })
        const response = await getApiGroupList(obj)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if(result){
            const data = result.data;
            this.setState({list:data})
        }
    }
    //为第一次render准备数据
    componentWillMount() {
        this.initColumns()
    }
    render(){


        const { list, total, loading, obj } = this.state

        const extra = (

            <Button type="primary" color='pick' onClick={() => this.props.history.push('/apitest/uri/add')}>
                <PlusOutlined />
                添加
            </Button>
        )
        return(
            <Card  className='groupHome' >
            <Table
                columns={this.columns}
                dataSource={list}
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