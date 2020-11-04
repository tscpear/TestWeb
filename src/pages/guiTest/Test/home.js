
import React, { Component } from 'react'
import { Card, Table, Button, Modal } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined,ForwardOutlined } from '@ant-design/icons'
import { getApiGroupList, addUpdateGroupData, delGroup,getDoGroupData } from '../../../api/index'
import { PAGE_SIZE } from '../../../utils/constants'
import '../../apitest/index.less'
import { responseJudge } from '../../../components/public'
export default class Test extends Component{
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
        Modalvisible: false,
    }

    //初始化所有的列
initColumns = () => {
    this.columns = [
        {
            title: '流程编号',
            dataIndex: 'id',
            key: 'id',
            width: 50,
            align: "center"
        },
        {
            title: '描述',
            dataIndex: 'groupMark',
            key: 'groupMark',
            width: 200,
            align: "center",
        },
        {
            title: '定时任务',
            dataIndex: 'groupMark',
            key: 'groupMark',
            width: 100,
            align: "center",
        },
        {
            title: '操作',
            align: 'center',
            key: 'action',
            width: 100,
            render: (list) => {
                return (<div >
                    <a style={{ padding: "0 5px" }} onClick={ ()=>this.goToDo(list.id)}><ForwardOutlined/></a>
                    <a onClick={() => this.getUpdateData(list.id)} style={{ padding: "0 5px" }}><EditOutlined /></a>
                    <a style={{ padding: "0 5px" }} onClick={()=>this.showModal(list.id)}><DeleteOutlined twoToneColor="red" /></a>
                </div>)

            }
        }
    ]

}
    render(){
        const { list, total, loading, obj } = this.state
        const extra = (
            <div>
                <Button type="primary" color='pick' onClick={() => this.props.history.push('/guiTest/test/add')}>
                    <PlusOutlined />
                添加
                 </Button>
                <Modal
                   
                    visible={this.state.Modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    keyboard={true}
                    onOk={this.delGroup}
                    onCancel={this.hideModal}
                    okText="确定"
                    cancelText="取消"
                >
                    <p style={{fontSize:"16px"}}>确定删除该流程？</p>
                </Modal>
            </div>

        )
        return(
            <Card className='groupHome' extra={extra} >
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