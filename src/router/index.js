import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'
import puzzle from "../pages/puzzle/puzzle"
const guide = asyncComponent(() => import("@/pages/guide/guide"))
const home = asyncComponent(() => import("@/pages/home/home"))
const chooseClass = asyncComponent(() => import("@/pages/chooseClass/choose_class"))
const answer = asyncComponent(() => import("@/pages/answer/answer"))
const boom = asyncComponent(() => import("@/pages/boom/boom"))
const end = asyncComponent(() => import("@/pages/end/end"))

export default class RouteConfig extends Component {
	render () {
		return (
			<HashRouter>
				<Switch>
					<Route path="/puzzle" component={puzzle}/>
					<Route path="/boom"  component={boom}/>
					<Route path="/guide" component={guide}/>
					<Route path="/chooseClass" component={chooseClass}/>
					<Route path="/answer" component={answer}/>
					<Route path="/end" component={end}/>
					<Route path="/" exact component={home}/>
				</Switch>
			</HashRouter>
		)
	}
}