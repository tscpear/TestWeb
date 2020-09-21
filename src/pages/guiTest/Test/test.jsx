import React,{Component} from 'react'
import { Route,Switch } from "react-router-dom"
import GuiTestHome from './home.js'
export default class Case extends Component{
    render(){
        return(
            <Switch>
               <Route exact path='/guiTest/test' component = {GuiTestHome}/>
           </Switch>
        )
    }
}
