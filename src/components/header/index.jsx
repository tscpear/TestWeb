import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtil from '../../utils/storageUtils'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';


class Header extends Component {
    getTitle = () => {
        //等到当前请求路径
        let path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {//如果当前item的对象与path匹配
                title = item.title
            } else if (item.children) {
                if (path.indexOf('/apitest/uri') === 0) {
                    path = '/apitest/uri'
                } else if (path.indexOf('/apitest/case') === 0){
                    path = '/apitest/case'
                } else if (path.indexOf('/apitest/report') === 0) {
                    path = '/apitest/report'
                }else if (path.indexOf('/apitest/group') === 0) {
                    path = '/apitest/group'
                }else if (path.indexOf('/createdata/tire') === 0) {
                    path = '/createdata/tire'
                }
            
                const cItem = item.children.find(cItem => cItem.key === path)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }


    logout = () => {
        const props = this.props
        Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            content: '是否退出登入',
            onOk() {
                storageUtil.removeData("user_key");
                memoryUtils.user = {}
                props.history.replace('/login')
            },
        });
    }



    render() {
        const title = this.getTitle()
        const projectName = storageUtil.getData('project_name_key');
        return (
            <div className='header' >
                <div className='header-left'>
                    <span>{title}</span>
                </div>
                <div className='header-right'>
                    <span>项目名称：{projectName}</span>
                    <a style={{margin:'0px 20px'}} onClick={this.logout}>退出</a>
                </div>

            </div>

        )
    }

}
export default withRouter(Header)