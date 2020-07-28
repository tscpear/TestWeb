import React from 'react';
import {HomeOutlined,SecurityScanOutlined,StarTwoTone,FireTwoTone,CrownTwoTone } from '@ant-design/icons';


const menuList = [
    {
        title: '首页',
        key: '/home',
        icon: <HomeOutlined/>
    },
    {
        title: '接口测试管理',
        key: '/apitest',
        icon: <SecurityScanOutlined />,
        children: [
            {
                title: '接口管理',
                key: '/apitest/uri',
                icon: <StarTwoTone twoToneColor="white" />
            },
            {
                title: '用例管理',
                key: '/apitest/case',
                icon: <StarTwoTone twoToneColor="white" />
            },
            {
                title:'接口流程',
                key:'/apitest/group',
                icon: <StarTwoTone twoToneColor="white" />
            },
            {
                title:'报告管理',
                key:'/apitest/report',
                icon: <StarTwoTone twoToneColor="white" />
            }
        ]
    },  {
        title: '创建测试数据',
        key: '/ceatedata',
        icon: <CrownTwoTone  twoToneColor="white"/>,
        children: [
            {
                title: '网红轮胎数据',
                key: '/createdata/tire',
                icon: <FireTwoTone twoToneColor="red" />
            },
        ]
    }
]

export default menuList