import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom"
import ReportHome from "./home"
import DoTest from './doTest'

export default class Report extends Component {

    render() {
        return (
            <Switch>
                <Route exact path='/apitest/report' component={ReportHome}/>
            </Switch>
        )
    }

}