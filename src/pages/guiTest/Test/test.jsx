import React,{Component} from 'react'
import { Route,Switch } from "react-router-dom"
import GuiTestHome from './home.js'
import GuiTestGroupAddUpdate from './addUpdate.js'
export default class Case extends Component{
    render(){
        return(
            <Switch>
               <Route exact path='/guiTest/test' component = {GuiTestHome}/>
               <Route exact path='/guiTest/test/add' component = {GuiTestGroupAddUpdate}/>
               <Route exact path='/guiTest/test/update' component = {GuiTestGroupAddUpdate}/>
           </Switch>
        )
    }
}
