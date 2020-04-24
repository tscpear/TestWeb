import React, { Component } from 'react'
import './index.less'
import logo from './image/1.jpg'
import { Link, withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuConfig';




const { SubMenu } = Menu;


class LeftNav extends Component {

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.map(item => {

            if (!item.children) {
                console.log("测试:" + item.title);
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )

            } else {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key))
                if (!cItem) {
                } else { this.openKey = item.key }
                return (
                    console.log(item.key),
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                {item.icon}
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

        })
    }
    //再第一次runder之前 执行一次
    //为第一个 准备数据  
 
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {

        let path = this.props.location.pathname


        if(path.indexOf('/apitest/uri')===0){
            path = '/apitest/uri'
        }

        const openKey = this.openKey


        return (
            <div to='/' className='left-nav'>
                <div className='left-nav-header-name'>
                    <Link to='/home'>
                        <h1><img src={logo} alt="logo" />测试平台</h1>
                    </Link>
                </div>
                <div className='left-nav-header-menu'>
                    <Menu
                        selectedKeys={[path]}
                        defaultOpenKeys={[openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            this.menuNodes
                        }

                    </Menu>
                </div>
            </div>

        )
    }

}

/**
 * 高阶组件
 */
export default withRouter(LeftNav)
