import React, { Component } from 'react'
import { ArrowLeftOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Card, Form, Input, Button, Modal,
    Row, Col, Steps,
} from 'antd'
import { addApiCaseGroup, updateApiCaseGroup } from '../../../api/index'
import { responseJudge } from '../../../components/public'
export default class DoGroup extends Component {
    state = {
        data: [1, 2, 3]
    }
    step = (data) => {
        let option = [];
        data.map((item, index) => {
            let steps = (<Steps.Step title="1" description="This is a description." />)
            option.push(steps);
        })
        return option;

    }


    render() {
        const description = (
            <div>
                鸟妈妈
            </div>
        )
        return (
            <Card style={{ height: "100%" }}>
                <Steps current={1} direction="vertical" percent={60}>
                    <Steps.Step title="登入" description={description} />
                    {this.step(this.state.data)}
                </Steps>
            </Card>
        )
    }

}