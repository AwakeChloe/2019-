import React, {Component} from 'react'
import './home.scss'
import '../../index.css'
import { connect } from 'react-redux'
import Img from '../../assets/inputUserName.png'
import inputImg from '../../assets/components/input.png'
import buttonImg from '../../assets/components/button.png'
import {CSSTransition} from "react-transition-group"
import {hasRegister} from '@/store/action'
import API from '@/api/api'

class Home extends Component{
	state = {
		username: '',
		registerFailed: false,
		leave: true
	}

	handleInput = (event) => {
		this.setState(
			{
				username: event.target.value,
			})
	}

	login = async () => {
		let data = {
			username: this.state.username
		}
		let result = await API.postUserName(data)
		if (result.message !== 'ok') {
			this.setState(
				{
					registerFailed: true
				}
			)
			setTimeout(() => {
				this.setState(
					{
						registerFailed: false
					}
				)
			}, 3000)
			this.props.history.push()
		} else if (result.status === 1) {
			this.props.hasRegister(this.state.username)
			this.setState(
				{
					leave: false
				}
			)
			setTimeout(() => {
				this.props.history.replace('/guide')
			}, 500)
		}
}

	render () {
		return (
				<CSSTransition
					in={this.state.leave}
					appear={true}
					classNames="fade"
					timeout={500}
				>
					<div className='home'>
						<img src={Img} alt='背景'/>
						<div className='input'>
							<img src={inputImg} alt='input'/>
							<div className='relative'>
								<div>
									用户名:
								</div>
								<input onChange={this.handleInput}/>
							</div>
						</div>
						{this.state.registerFailed ? <p>该用户名已被占用，请重新输入</p> : ''}
						<img className='button' src={buttonImg} alt='button'/>
						<button onClick={this.login}>进入游戏</button>
					</div>
				</CSSTransition>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		hasRegister: (content) => dispatch(hasRegister(content))
	}
}

export default connect(null, mapDispatchToProps)(Home)