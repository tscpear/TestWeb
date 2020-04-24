import React,{Component} from 'react'
import { Route,Switch } from "react-router-dom"
import ApiCaseHome from './home'
import CaseAddUpdate from './add-update'
export default class Case extends Component{
    render(){
        return(
            <Switch>
               <Route exact path='/apitest/case' component = {ApiCaseHome}/>
               <Route exact path='/apitest/case/update' component = {CaseAddUpdate}/>
           </Switch>
        )
    }
}