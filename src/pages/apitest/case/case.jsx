import React,{Component} from 'react'
import { Route,Switch } from "react-router-dom"
import ApiCaseHome from './home'
import CaseAddUpdate from './add-update'
import DoTest from './../report/doTest'
import UriHome from './../uri/home'
export default class Case extends Component{
    render(){
        return(
            <Switch>
               <Route exact path='/apitest/case' component = {ApiCaseHome}/>
               <Route exact path='/apitest/case/update' component = {CaseAddUpdate}/>
               <Route exact path='/apitest/case/doTest' component = {DoTest}/>
               <Route exact path='/apitest/case/uriList' component = {UriHome}/>
           </Switch>
        )
    }
}
