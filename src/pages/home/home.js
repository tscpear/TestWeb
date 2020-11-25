import React, { Component } from 'react'
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, InputNumber,Statistic
} from 'antd'
import { ArrowLeftOutlined, FieldStringOutlined, MinusCircleOutlined, PlusOutlined, SoundTwoTone } from '@ant-design/icons';
export default class Home extends Component {
    render() {

        const projectDescribe = 'nimamma';
        const title = (
            <h1>
                项目简介：{projectDescribe}
            </h1>
        )
        const extra = (
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="接口数量" value={112893} />
                </Col>
                <Col span={12}>
                    <Statistic title="接口用例数量" value={112893} />
                   
                </Col>
                <Col span={12}>
                    <Statistic title="事件数量" value={112893}/>
                </Col>
                <Col span={12}>
                    <Statistic title="界面用例数量" value={112893}/>
                </Col>
            </Row>
        )
        return (
            <div>
                <Card title={title} extra={ extra}>

                </Card>




            </div>
        )
    }
}