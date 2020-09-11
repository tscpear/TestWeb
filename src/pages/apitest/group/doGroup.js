import React, { Component } from 'react'
import { ArrowLeftOutlined, MinusCircleOutlined, UserOutlined, StopOutlined, LockOutlined, SendOutlined, SyncOutlined } from '@ant-design/icons';
import {
    Card, Form, Input, Button, Modal,
    Row, Col, Steps, Timeline, Select, Tag, message, Collapse, Table, Divider
    , Drawer
} from 'antd'
import { putToken, getAccountList, doGroupOne, getOneReport } from '../../../api/index'
import { deviceNameOfList, deviceColorOfList, responseJudge } from '../../../components/public'
import storageUtils from '../../../utils/storageUtils'
import './../index.less'
const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
export default class DoGroup extends Component {
    state = {
        account: [],
        accountValue: [],
        bigTitle: "",
        doGroupOfRealyDataToCaseLists: [],
        environmentItem: [],
        environment: 1,
        tokenData: {
            environment: 1,
            testList: [],
            groupId: 0,
            reportId: 0
        },
        wxCodeNum: 0,
        wxCode: [],
        num: [],
        step: 1,
        stepStatus: "wait",
        reportId: 0,
        requestData: {
            apiPath: "asdqweqe",
            headerParam: [],
            webformParam: [],
            bodyParam: [],

        },
    }
    showDrawer = async (id) => {
        await this.getOneReport(id);
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    getOneReport = async (id) => {
        this.setState({ loading: true })
        const response = await getOneReport(id)
        this.setState({ loading: false })
        const result = responseJudge(response);
        if (result) {
            const data = result.data;
            this.setState({ requestData: data });
        }
    };
    step = () => {
        const { account, doGroupOfRealyDataToCaseLists } = this.state;
        let option = [];
        let accountDescription = (
            <Timeline mode="left" style={{ padding: "40px 10px" }}>
                {this.accountLine(account)}
            </Timeline>
        )
        option.push(<Steps.Step title="登入" description={accountDescription} icon={<UserOutlined />} />);
        doGroupOfRealyDataToCaseLists.map((item, index) => {
            let list = item.dataForReadyGroups;
            let title = item.teamName;
            let description = (
                <Timeline mode="left" style={{ margin: "40px 15px" }}>
                    {this.timeline(list)}
                </Timeline>
            )
            let steps = (<Steps.Step title={title} description={description} />)
            option.push(steps);

        })
        return option;

    }
    /**
  * 修改测试账户的方法
  * @param {*} json 
  */
    onChangeAccount = (value, device, deviceType, index) => {
        const accountValue = this.state.accountValue;
        accountValue[index] = device + '.' + deviceType + '.' + value
        this.setState({ accountValue })
    }
    accountLine = (account) => {
        let option = [];
        account.map((item, index) => {
            let deviceName = item.deviceName;
            let deviceTypeName = item.deviceTypeName;
            let value = (<div>
                <div>
                    {deviceName}
                </div>
                <div>
                    {deviceTypeName}
                </div>
            </div>)
            let accountLines = (<Timeline.Item dot={<StopOutlined />} color="gray">{value}</Timeline.Item>)
            option.push(accountLines);
        })
        return option;
    }

    timeline = (data) => {
        let option = [];
        data.map((item, index) => {
            let name = item.apiCaseMark
            let success = item.success;
            let apiCaseId = item.apiCaseId;
            let id = item.id;
            let device = item.device;
            const color = () => {

                switch (success) {
                    case 0:
                        return "grey";
                    case 1:
                        return "green";
                    case 2:
                        return "red";
                }
            }
            let disables = true;
            if (id) {
                disables = false;
            }
            let timelines = (<Timeline.Item dot={<a onClick={() => this.showDrawer(id)} disabled={disables} style={{ width: '100%' }}>
                <Tag color={color()} style={{ marginTop: '0px', height: 'auto' }}>{apiCaseId}</Tag>
            </a>} color="gray">
                <Tag color={deviceColorOfList(device)} key={device}>{deviceNameOfList(device)}</Tag>{name}</Timeline.Item>)
            option.push(timelines);
        })
        return option;
    }
    hideModal = () => {
        this.setState({
            Modalvisible: false,
        });
    };
    showModal = () => {
        this.setState({
            Modalvisible: true,
        });
    };

    openIdOnchange = ({ target: { value } }) => {
        let codeList = value.split(",");
        this.setState({ wxCode: codeList })
    }
    openId = (account) => {
        let num = 0;
        account.map(item => {
            let deviceName = item.deviceName;
            if (deviceName.indexOf("小程序") !== -1) {
                num++;
            }
        })
        if (num > 0) {
            let placeholder = "需要" + 2 * num + "个微信code(一个小程序账号需要两个code,用“,”分割)"
            return (
                <Input.TextArea
                    // value={value}
                    onChange={this.openIdOnchange}
                    placeholder={placeholder}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                />)
        }
    }
    environmentOnChange = (value) => {
        this.setState({ environment: value }, () => {
            let tokenData = this.state.tokenData;
            let testList = this.state.testList;
            tokenData.testList = testList;
            this.getAccount(tokenData);
        })
    }
    getAccount = async (tokenData) => {
        const { environment, reportId } = this.state;
        if (reportId !== 0) {
            tokenData.reportId = reportId;
        }
        let value = Object.assign(tokenData, { "environment": environment });
        var response = await getAccountList(value);
        var result = responseJudge(response);
        if (result) {
            var account = result.data;
            var accountValue = [];
            account.map((item, index) => {
                accountValue[index] = item.device + '.' + item.deviceType + '.' + 1;
            });
            this.setState({ account, accountValue })
        }
    }

    putToken = async () => {
        const { environment, accountValue, wxCodeNum, wxCode } = this.state;
        let wxCodeSize = wxCode.size;
        if (wxCodeNum === wxCodeSize) {

        }
        var value = { "environment": environment, "accountValue": accountValue, "wxCode": wxCode };
        this.setState({ loading: true })
        const response = await putToken(value)
        this.setState({ loading: false })
        const result = responseJudge(response);
    }

    doAll = async () => {
        const { num, id, environment, accountValue } = this.state;
        console.log(num);
        var next = true;
        var i;
        for (i = 1; i <= num; i++) {
            if (next === true) {
                var reportId = this.state.reportId;
                console.log(reportId)
                var obj = Object.assign({ 'groupId': id, 'teamId': i, "environment": environment, 'accountValue': accountValue, "reportId": reportId })
                next = await this.doOne(obj);
                this.setState({ step: i });
                if (next === false) {
                    i--;
                    message.error("流程中断")
                    break;
                }
            }    
        }
        console.log(num);
        console.log(i)
        if (i > num) {
            this.setState({ stepStatus: "finish" });
            message.success("执行完毕")
        } else {
            this.setState({ stepStatus: "error" });
        }

    }

    doOne = async (obj) => {
        const response = await doGroupOne(obj);
        const result = responseJudge(response);
        var next;
        if (result) {
            const data = result.data;
            const code = data.teamResult;
            const doGroupOfRealyDataToCaseLists = data.doGroupOfRealyDataToCaseLists;
            const reportId = data.reportId;
            console.log(reportId)
            this.setState({ reportId, data, doGroupOfRealyDataToCaseLists }, () => {
                if (code === 1) {
                    next = true;
                } else {
                    this.setState({ reportId: 0 }, () => {
                        next = false;
                    });
                }
            })

        }
        return next;
    }

    componentDidMount() {
        const environmentItem = storageUtils.getData('environment_key');
        const data = this.props.location.state;
        var account = data.deviceAndTypes;
        var doGroupOfRealyDataToCaseLists = data.doGroupOfRealyDataToCaseLists;
        var accountValue = [];
        var bigTitle = data.groupMark;
        var testList = data.testList;
        var id = data.groupId;
        var num = data.doGroupOfRealyDataToCaseLists.length;
        account.map((item, index) => {
            accountValue[index] = item.device + '.' + item.deviceType + '.' + 1;
        });
        this.setState({ account, accountValue, environmentItem, testList, id, num, doGroupOfRealyDataToCaseLists, bigTitle });
        this.environmentOnChange(1);
    }
    render() {
        const { dotestName, account, environmentItem, bigTitle, step, stepStatus, requestData } = this.state;
        const accountTitle = (
            <div>
                <span style={{ margin: "0px 100px 0px 0px" }}>
                    账号与环境
                </span>
                <span>
                    <Button color="red" style={{ float: "right" }} onClick={this.sxAccount}>
                        <SyncOutlined spin />
                  刷新账号
              </Button>
                </span>
            </div>
        )
        const phoneList = (item, index) => {
            return (
                <div style={{ margin: '10px 0px' }} key={index}>
                    <div style={{ display: 'inline-block', width: '20%' }}>{item.deviceName}</div>
                    <div style={{ display: 'inline-block', width: '30%' }}>{item.deviceTypeName}</div>
                    <div style={{ display: 'inline-block', width: '50%' }}>
                        <Select autoFocus={true} style={{ width: '200px' }} defaultValue={1} onChange={(value) => this.onChangeAccount(value, item.device, item.deviceType, index)}>
                            {item.accountList.map((item, index) => (
                                <Select.Option value={index + 1} key={index + 1}>{item}</Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
            )
        }


        const card = (
            <div>
                流程描述：{bigTitle}
            </div>
        )
        const extra = (
            <div>
                <Button type='primary' onClick={this.showModal} style={{ backgroundColor: '#9BCD9B', border: '1px solid #9BCD9B', margin: '0px 10px' }}>
                    <SyncOutlined spin />账号与环境
                 </Button>
                <Button type='primary' onClick={this.doAll} style={{ margin: '0px 10px' }}>
                    <SendOutlined />一步到位
                 </Button>
                <Button disabled={true} type='primary' onClick={this.showModal} style={{ margin: '0px 10px' }}>
                    <SendOutlined />分布式
                 </Button>
                <Button type='primary' disabled={true} onClick={this.showModal} style={{ backgroundColor: '#CCCCFF', border: '1px solid #CCCCFF', margin: '0px 10px' }}>
                    <SyncOutlined spin />重启
                 </Button>

                <Modal
                    title={accountTitle}
                    visible={this.state.Modalvisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    closable={false}
                    keyboard={true}
                    onOk={this.hideModal}
                    onCancel={this.hideModal}
                >
                    <div>
                        <Select autoFocus={true} style={{ width: '100px' }} defaultValue={1} onChange={this.environmentOnChange}>
                            {environmentItem.map((item, index) => (
                                <Select.Option value={index + 1} key={index + 1}>{item}</Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div style={{ margin: '20px 0px 0px 0px' }}>
                        {account.map((item, index) => {
                            return phoneList(item, index);
                        })}
                    </div>
                    <div style={{ marginRight: "35px" }}>
                        {this.openId(account)}
                    </div>
                    <Button type='primary' style={{ backgroundColor: 'orange', border: '1px solid orange', margin: "20px 0px 0px 0px" }} onClick={this.putToken}>
                        <LockOutlined />固定token
                </Button>
                </Modal>
            </div>

        )
        const dColumns = [
            {
                title: 'name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'value',
                dataIndex: 'value',
                key: 'value',
            },
        ];
        const expectColumns = [
            {
                title: '路径',
                dataIndex: 'path',
                key: 'path',
            },
            {
                title: '期望值',
                dataIndex: 'expectValue',
                key: 'expectValue',
            },
            {
                title: '实际值',
                dataIndex: 'actValue',
                key: 'actValue',
            },
        ];
        return (
            <Card style={{ height: "100%" }} title={card} extra={extra} className='groupDo myform'>
                <Steps current={step} percent={60} direction="vertical" status={stepStatus} >
                    {this.step()}
                </Steps>
                <Drawer
                    width={'60%'}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 请求路径</p>
                    <p className="site-description-item-profile-p">{requestData.apiMethod}      {requestData.apiPath}</p>
                    <Divider style={{ backgroundColor: "green" }} />

                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 请求参数</p>
                    <Collapse bordered={false} style={{ backgroundColor: "#fff" }}>
                        <Collapse.Panel header="请求头参数" key="1" showArrow={false}>
                            <Table
                                columns={dColumns}
                                dataSource={requestData.headerParam}
                                size="small"
                                pagination={false}

                            />

                        </Collapse.Panel>
                        <Collapse.Panel header="form表单参数" key="2" showArrow={false}>
                            <Table
                                columns={dColumns}
                                dataSource={requestData.webformParam}
                                size="small"
                                pagination={false}>

                            </Table>
                        </Collapse.Panel>
                        <Collapse.Panel header="body参数" key="3" showArrow={false}>
                            <pre><code id="json">  {JSON.stringify(requestData.bodyParam, undefined, 2)}</code></pre>
                        </Collapse.Panel>
                    </Collapse>
                    <Divider style={{ backgroundColor: "green" }} />
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 期望断言</p>
                    <Collapse bordered={false} style={{ backgroundColor: "#fff" }}>
                        <Collapse.Panel header="状态码期望值" key="1" showArrow={false}>
                            <Row>
                                <Col span={12}>
                                    <DescriptionItem title="期望状态码" content={requestData.expectStatus} />
                                </Col>
                                <Col span={12}>
                                    <DescriptionItem title="实际状态码" content={requestData.actStatus} />
                                </Col>
                            </Row>
                        </Collapse.Panel>
                        <Collapse.Panel header="返回值期望" key="2" showArrow={false}>
                            <Table
                                columns={expectColumns}
                                dataSource={requestData.responseValueExpectResult}
                                size="small"
                                pagination={false}>

                            </Table>
                        </Collapse.Panel>
                    </Collapse>
                    <Divider style={{ backgroundColor: "green" }} />
                    <p className="site-description-item-profile-p" style={{ color: "green" }}> 返回值</p>
                    <pre><code id="json">  {JSON.stringify(requestData.response, undefined, 2)}</code></pre>
                </Drawer>

            </Card>
        )
    }

}