import React from 'react';
import {HomeOutlined, HeartTwoTone,SecurityScanOutlined} from '@ant-design/icons';


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
                icon: <HeartTwoTone twoToneColor="#eb2f96" />
            },
            {
                title: '用例管理',
                key: '/apitest/case',
                icon: <HeartTwoTone twoToneColor="#eb2f96" />
            }
        ]
    }
]

export default menuList