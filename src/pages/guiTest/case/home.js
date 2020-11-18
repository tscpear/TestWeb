import React, { Component } from 'react'
import { Card, Table, Button, Tag, Select, Input, Modal } from 'antd'
import { PAGE_SIZE } from '../../../utils/constants'
import '../../apitest/index.less'
import { getGuiList, getOneGuiData } from '../../../api/index'
import memoryUtils from '../../../utils/memoryUtils'
import storageUtils from '../../../utils/storageUtils'
import { deviceNameOfList, deviceColorOfList, deviceSelect, responseJudge } from '../../../components/public'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
export default class GuiCaseHome extends Component {

    state = {
        data: [
            {
                id: 1
            }
        ],
        userList:[],
    }

    //初始化所有的列
    initColumns = () => {
        this.columns = [
            {
                title: '编号',
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
                title: '描述',
                dataIndex: 'name',
                key: 'name',
                align: "center"
            },
            {
                title: '元素',
                dataIndex: 'element',
                key: 'element',
                align: "center"
            },
            {
                title: '事件',
                dataIndex: 'active',
                key: 'active',
                width: 100,
                align: "center",
                render: active => {
                    let color
                    let value
                    switch (active) {
                        case 1:
                            color = 'green';
                            value = '单击';
                            break;
                        case 2:
                            color = 'grey';
                            value = '双击';
                            break;
                        case 3:
                            color = 'blue';
                            value = '输入';
                            break;
                        case 4:
                            color = 'red';
                            value = '清除';
                            break;
                        case 5:
                            color = 'black';
                            value = '下滑';
                            break;
                        case 6:
                            color = 'orange';
                            value = '上滑';
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
                title: '创建人',
                dataIndex: 'createUserId',
                key: 'createUserId',
                align: "center",
                width: 100,
                render: (createUserId) => {
                    const userList = this.state.userList;
                    console.log(createUserId)
                    return userList[createUserId-1].name;
                    
                }
            },
            {
                title: '操作',
                align: 'center',
                key: 'action',
                width: 100,
                render: (list) => {
                    return (<div >
                        {/* <a style={{ padding: "0 5px" }} onClick={() => this.props.history.push('/guiTest/case/addUpdate')}><PlusOutlined /></a> */}
                        <a style={{ padding: "0 5px" }} onClick={() => this.getOneGuiData(list.id)}><EditOutlined /></a>
                        <a style={{ padding: "0 5px" }}><DeleteOutlined twoToneColor="red" />
                        </a>
                    </div>)

                }
            }
        ]
    }
    //为第一次render准备数据
    UNSAFE_componentWillMount() {
        const userList = storageUtils.getData("user_list");
        this.setState({userList},()=> this.initColumns())
      

    }
    componentDidMount() {
        this.getGuiList();
    }

    getGuiList = async () => {
        const response = await getGuiList();
        const result = responseJudge(response);
        if (result) {
            this.setState({ data: result.data });
        }
    }

    getOneGuiData = async (id) => {
        const response = await getOneGuiData(id);
        const result = responseJudge(response);
        if (result) {
            const data = result.data;
            this.props.history.push('/guiTest/case/addUpdate', data);
        }
    }
    render() {
        const { data
        } = this.state;

        const extra = (
            <Button type="primary" color='pick' onClick={() => this.props.history.push('/guiTest/case/addUpdate')}>
                <PlusOutlined />
                添加
            </Button>
        )

        return (
            <Card className='apihomep guicasehome' extra={extra}>
                <Table
                    columns={this.columns}
                    bordered
                    dataSource={data}
                    size="small"
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        total: 10,
                        pageSizeOptions: ['10', '20', '50', '100', '200', '500', '1000', '5000'],
                        showSizeChanger: true,
                    }}
                />
            </Card>
        )
    }
}