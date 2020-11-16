import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, Checkbox, message, Select, Divider } from 'antd'
import { UserOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons'
import { reqLogin, getProjectList } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

/**
 * 登录的路由组件
 */
export default class Login extends Component {

    state = {
        items: ['jack', 'lucy'],
    }



    getProjectList = async () => {
        const response = await getProjectList()
        const result = response.data;
        if (result.code === 1) {
            this.setState({items:result.data})
        }
    }
    UNSAFE_componentWillMount() {
        this.getProjectList()
    }
    selectProject=(value)=>{
        this.setState({projectId:value})
    }
    render() {
        //判断是否已经登入

        const user = memoryUtils.user
        if (user.userId) {
            return <Redirect to='/' />
        } else {
           
        }
      

        const onFinish = async values => {
           const projectId = this.state.projectId;
            const { username, password } = values
            const response = await reqLogin(username, password,projectId)
            const result = response.data
            if (result.code === 1) {
                message.success('登入成功')
                const user = result.user
                const projectId = result.projectId;
                const environment = result.environment;
                const projectName = result.projectName;
                const deviceList = result.device;
                const token = result.token;
                const userList = result.userList;
                memoryUtils.projectId = projectId
                storageUtils.saveData('project_id_key',projectId)
                memoryUtils.user = user
                storageUtils.saveData('user_key',user);
                storageUtils.saveData('environment_key',environment);
                storageUtils.saveData('project_name_key',projectName);
                storageUtils.saveData('device_list_key',deviceList);
                storageUtils.saveData('token_key',token)
                storageUtils.saveData('user_list',userList)
                storageUtils.saveData('user_id',user.id);
                this.props.history.replace('/')
            } else {
                message.error(result.msg)
            }
        }
        const { items, name } = this.state;
        return (


            <div className='login'>
                <header className='login-header'></header>
                <section className='login-content'>
                    <div className='login-title'>
                        <h1>
                            <strong>测试平台2.0</strong>
              Test Frist
            </h1>
                        <div className='login-description'>
                            <p>来自一穷二白的尝试</p>
                        </div>
                    </div>
                    <div className='login-form-title'>
                        <div className='login-form-title-left'>
                            <div>
                                <h3>阿尼赛哟</h3>
                                {/* <p>请输入您的账号与密码:</p> */}
                            </div>

                        </div>
                        <div className='login-form-title-right'>
                            <Select
                                onChange={this.selectProject}
                                style={{ width: '100%' }}
                                placeholder="请选择对应的项目"
                                dropdownRender={menu => (
                                    <div>
                                        {menu}
                                        <Divider style={{ margin: '4px 0' }} />
                                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                            <Input style={{ flex: 'auto' }} />
                                            <a
                                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                                onClick={this.addItem}
                                            >
                                                <PlusOutlined /> Add item
              </a>
                                        </div>
                                    </div>
                                )}
                            >
                                {items.map((item,index) => (
                                    <Select.Option key={index} value={item.id}>{item.name}</Select.Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    <div className='login-form-myself'>
                        <Form
                            name='normal_login'
                            className='login-form'
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name='username'
                                rules={[{ required: true, message: '请输入你的账号!' }]}
                            >
                                <Input
                                    prefix={<UserOutlined className='site-form-item-icon' />}
                                    placeholder='Username'
                                />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                rules={[
                                    { required: true, message: '请输入你的密码' },
                                    { len: 6, message: '密码长度6位' }
                                ]}
                            >
                                <Input
                                    prefix={<LockOutlined className='site-form-item-icon' />}
                                    type='password'
                                    placeholder='Password'
                                />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item name='remember' valuePropName='checked' noStyle>
                                    <Checkbox>记住密码</Checkbox>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='login-form-button'
                                >
                                    登 入
                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>

                <footer className='login-footer'></footer>
            </div>
        )
    }
}
