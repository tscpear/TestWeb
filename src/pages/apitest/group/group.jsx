import React, { Component } from "react";
import { Route,Switch } from "react-router-dom"
import GroupHome from './home'
import AddUpddate from './addAndUpdate'
import DoGroup from './doGroup'

export default class Group extends Component{
    render(){
        return(
          <Switch>
               <Route exact path='/apitest/group' component = {GroupHome}/>
                <Route exact path='/apitest/group/add' component = {AddUpddate}/>
                <Route exact path='/apitest/group/update' component = {AddUpddate}/>
                <Route exact path='/apitest/group/do' component = {DoGroup}/>
          </Switch>
        )
    }
}