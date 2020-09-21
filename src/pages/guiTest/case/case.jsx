import React,{Component} from 'react'
import { Route,Switch } from "react-router-dom"
import GuiCaseHome from './home'
import AddUpdate from './addUpdate'
export default class Case extends Component{
    render(){
        return(
            <Switch>
               <Route exact path='/guiTest/case' component = {GuiCaseHome}/>
               <Route exact path='/guiTest/case/addUpdate' component = {AddUpdate}/>
           </Switch>
        )
    }
}
