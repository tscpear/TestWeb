import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

//读取local中的user，

const user = storageUtils.getUser()
console.log(typeof user)
memoryUtils.user = user
//将App组件标签渲染到index页面的div上
ReactDOM.render(<App />,document.getElementById('root'))
