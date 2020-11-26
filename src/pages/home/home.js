import React, { Component } from 'react'
import './home.less'
import {
    Card, Form, Input, Select, Button,
    Tag, Radio, Checkbox, Row, Col, Switch, InputNumber, Statistic
} from 'antd'
import ReactEcharts from 'echarts-for-react';
import { getTestCaseNumReport } from '../../api'
import { responseJudge } from '../../components/public'
import { ArrowLeftOutlined, FieldStringOutlined, MinusCircleOutlined, PlusOutlined, SoundTwoTone } from '@ant-design/icons';
export default class Home extends Component {


    state = {
        sales: [5, 20, 36, 10, 10, 20],
        stores: [15, 120, 36, 110, 110, 20],
        series: [],
        xAxis: [],
        apiNum: 0,
        apiTestCaseNum: 0,
       
    }

    componentDidMount() {
        this.getTestCaseNumReport();
    }

    itemStyle=(index)=>{
            const  itemStyle = {
                normal: {
                    //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
                    color: function () {
                        // build a color map as your need.
                        var colorList = [
                            'grey', 'orange', '#FCCE10', '#E87C25', '#27727B',
                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                            '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
                        ];
                        setInterval(function () {})
                        return colorList[Math.ceil(Math.random()*10)]
                    },
                    //以下为是否显示，显示位置和显示格式的设置了
                    label: {
                        show: true,
                        position: 'top',
                        //                             formatter: '{c}'
                        // formatter: '{b}\n{c}'
                    }
                }
            }
            return itemStyle;
    
    }

    getTestCaseNumReport = async () => {
        const response = await getTestCaseNumReport();
        const result = responseJudge(response);
        const series = [];
        if (result) {
            this.setState({ xAxis: result.data.xaxis, apiNum: result.data.apiNum, apiTestCaseNum: result.data.apiTestCaseNum }, () => {
                result.data.series.map((item, index) => {
                    item = Object.assign(item, { 'itemStyle': this.itemStyle(index)});
                    series.push(item);
                });
                this.setState({series})

            });

        }
    }


    getOption = () => {
        const { series, xAxis } = this.state;
        console.log(xAxis);
        console.log("xAxis")
        return {
            title: {
                text: '低级数据统计'
            },
            tooltip: {},
            legend: {
                data: ['接口数量', '接口用例数量']
            },
            xAxis: {
                data: xAxis
            },
            yAxis: {},
            series: series
        };
    }

    render() {
        const { sales, stores, apiNum, apiTestCaseNum } = this.state;
        const projectDescribe = '××、××、××、×× ××、それは危険なインビテーション ××、それは素敌なイントネーション 大人の事情、それで结局×× 放送コード、だから结局×× 言いたい、でも言えない 言ったところで×× 知りたい、でも知らない それが秘密の きっと内绪よ みんな知ってるはずなのに、みんなしっとり目をそらす みんな言ってるはずなのに、出るとこ出ると口つぐむ ××、×× ××、それは无限のイマジネーション ××、それは伏字のイリュージョン ';

        const extra = (
            <Row gutter={16}>
                <Col span={24}>
                    <Statistic title="接口数量" value={apiNum} />
                </Col>
                <Col span={24}>
                    <Statistic title="接口用例数量" value={apiTestCaseNum} />

                </Col>
                {/* <Col span={12}>
                    <Statistic title="事件数量" value={112893} />
                </Col>
                <Col span={12}>
                    <Statistic title="界面用例数量" value={112893} />
                </Col> */}
            </Row>
        )
        const title = (
            <div style={{ margin: '0px 50px 0px 0px', width: "80%" }} >

                <h4 style={{ fontWeight: '600' }}>项目简介：</h4><p style={{ textIndent: '2em' }}>{projectDescribe}</p>


            </div>

        )
        return (

            <Card title={title} extra={extra} className='homepage page-container'>
                <ReactEcharts option={this.getOption()} style = {{height : '300%'}}/>

            </Card>

        )
    }
}