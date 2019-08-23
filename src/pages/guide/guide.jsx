import React, {Component} from 'react'
import './guide.scss'
import '../../index.css'
import {CSSTransition} from "react-transition-group"

class Guide extends Component {
	state = {
		leave: true
	}

	toChoiceClass = () => {
		this.setState({
			leave: false
			}
		)
		setTimeout(() => {
			this.props.history.replace('/chooseClass')
		}, 500)
	}

	render () {
		return (
			<CSSTransition
				in={this.state.leave}
				appear={true}
				classNames="fade"
				timeout={500}
			>
				<div className='guide'>
					<img src='http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dc891jj30af0ijwg2.jpg' alt='背景'/>
					<button onClick={this.toChoiceClass}>
					</button>
				</div>
			</CSSTransition>
		)
	}
}

export default Guide