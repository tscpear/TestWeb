import React,{ Component } from "react"
import { Route,Switch } from "react-router-dom"
import UriHome from './home'
import UriAddUpdata from './add-updata'
import CaseAddUpdate from '../case/add-update'
import ApiCaseHome from '../case/home'


/**
 * 接口的子路由
 */
export default class Uri extends Component{
    render(){
        return(
           <Switch>
               <Route exact path='/apitest/uri' component = {UriHome}/>>
               <Route exact path='/apitest/uri/updata' component = {UriAddUpdata}/>
               <Route exact path='/apitest/uri/add' component = {UriAddUpdata}/>
               <Route exact path='/apitest/uri/addcase' component = {CaseAddUpdate}/>
               <Route exact path='/apitest/uri/apicaselist' component ={ApiCaseHome}/>
           </Switch>
        )
    }
}