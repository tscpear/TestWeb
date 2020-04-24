import React, { Component } from 'react'
import './login.less'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom'

/**
 * 登录的路由组件
 */
export default class Login extends Component {
    render() {
        //判断是否已经登入

        const user = memoryUtils.user
        if (user.userId) {
            return <Redirect to='/' />
        }

        const onFinish = async values => {
            const { username, password } = values
            const response = await reqLogin(username, password)
            const result = response.data
            if (result.code === 1) {
                message.success('登入成功')
                const user = result.user
                memoryUtils.user = user
                storageUtils.saveUser(user)
                this.props.history.replace('/')
            } else {
                message.error(result.msg)
            }
        }

        return (
            <div className='login'>
                <header className='login-header'></header>
                <section className='login-content'>
                    <div className='login-title'>
                        <h1>
                            <strong>测试平台</strong>
              Test Frist
            </h1>
                        <div className='login-description'>
                            <p>来自一穷二白的尝试</p>
                        </div>
                    </div>
                    <div className='login-form-title'>
                        <div className='login-form-title-left'>
                            <h3>登入窗口</h3>
                            <p>请输入您的账号与密码:</p>
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
