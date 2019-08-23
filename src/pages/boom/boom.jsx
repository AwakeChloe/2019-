import React, {Component} from 'react'
import './boom.scss'
import {CSSTransition} from "react-transition-group"
import {connect} from 'react-redux'
import '../../index.css'
import {Redirect} from 'react-router-dom'
import boom from '../../assets/components/boom.png'

class Boom extends Component {
	state = {
		backgroundImg: '',
		leave: true
	}

	componentDidMount () {
		switch (this.props.group) {
			case '研发组':
				this.setState({
					backgroundImg: 'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddzubxj30af0ijgnj.jpg',
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: 'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dfwgrmj30af0ijjtk.jpg',
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: 'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677df6yckj30af0ijmyp.jpg',
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: 'http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677db43ijj30af0ij40v.jpg',
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: 'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg',
				})
				break
			default:
				this.setState({
					backgroundImg: 'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg',
				})
		}
	}

	leave = () => {
		this.setState(
			{
				leave: false
			}
		)
		setTimeout(() => {
			this.props.history.replace('/puzzle')
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
				<div className='boom'>
					<img className='backgroundImg' src={this.state.backgroundImg} alt='背景'/>
					<img className='boom' src={boom} alt='彩蛋'/>
					<button onClick={this.leave}>
					</button>
					{this.props.login ? null : <Redirect to='/'/>}
				</div>
			</CSSTransition>
		)
	}
}

const mapStateToProps = state => {
	return {
		login: state.hasLogin,
		group: state.group
	}
}

export default connect(mapStateToProps, null)(Boom)