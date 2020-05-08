import React, { Component } from "react";
import { Route,Switch } from "react-router-dom"
import GroupHome from './home'

export default class Group extends Component{
    render(){
        return(
          <Switch>
               <Route exact path='/apitest/group' component = {GroupHome}/>
          </Switch>
        )
    }
}