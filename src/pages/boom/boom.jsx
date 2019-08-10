import React, {Component} from 'react'
import './boom.scss'
import {CSSTransition} from "react-transition-group"
import {connect} from 'react-redux'
import '../../index.css'
import {Redirect} from 'react-router-dom'
import ImgDesigner from '../../assets/designer1.png'
import ImgOpenHair from '../../assets/openHair1.png'
import ImgOperation from '../../assets/operation1.png'
import ImgAdmin from '../../assets/admin1.png'
import ImgProduct from '../../assets/producter1.png'
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
					backgroundImg: ImgOpenHair,
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: ImgProduct,
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: ImgOperation,
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: ImgDesigner,
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: ImgAdmin,
				})
				break
			default:
				this.setState({
					backgroundImg: ImgAdmin,
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