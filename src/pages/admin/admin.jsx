import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import ApiTestUri from '../apitest/uri/uri.jsx'
import ApiTestCase from '../apitest/case/case.jsx'
import ApiTestReport from '../apitest/report/report.jsx'
import ApiTestGroup from '../apitest/group/group.jsx'
import CreateDataTire from '../createData/trie/tire.jsx'
import GuiCaseHome from '../guiTest/case/case.jsx'
import GuiTestHome from '../guiTest/Test/test.jsx'
import './index.less'
/**
 * 登录的路由组件
 */
const { Footer, Sider, Content } = Layout


export default class Admin extends Component {

    render() {


        const user = memoryUtils.user
        if (!user || !user.id) {

            return <Redirect to='/login' />
        } return (
            <Layout style={{ minHeight: '100%' }}>
                <Sider style={{ position: 'fixed', minHeight: '100%' }}><LeftNav /></Sider>
                <Layout style={{ marginLeft: '200px' }}>
                    <Header style={{ position: 'relative', top: 0 }}>
                    </Header>
                    <Content style={{ mbackgroundColor: '#fff' }}>
                        <Switch>
                            <Route path='/home' component={Home} ></Route>
                            <Route path='/apitest/uri' component={ApiTestUri}/>
                            <Route path='/apitest/case' component={ApiTestCase}/>
                            <Route path='/apitest/report' component = {ApiTestReport}/>
                            <Route path='/apitest/group' component = {ApiTestGroup}/>
                            <Route path='/createdata/tire' component = {CreateDataTire}/>
                            <Route path='/guiTest/case' component = {GuiCaseHome}/>
                            <Route path='/guiTest/test' component = {GuiTestHome}/>
                            <Redirect to='/home'></Redirect>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}>锄禾日当午，汗滴禾下午</Footer>
                </Layout>
            </Layout>
        )


    }
}