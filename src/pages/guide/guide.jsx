import React, {Component} from 'react'
import './guide.scss'
import '../../index.css'
import {CSSTransition} from "react-transition-group"
import Img from '@/assets/guide.png'

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
					<img src={Img} alt='背景'/>
					<button onClick={this.toChoiceClass}>
					</button>
				</div>
			</CSSTransition>
		)
	}
}

export default Guide