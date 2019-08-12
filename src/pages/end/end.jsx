import React, {Component} from 'react'
import './end.scss'
import {CSSTransition} from "react-transition-group"
import '../../index.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import API from '@/api/api'
import button from  '../../assets/components/restartGame.png'
import one from '../../assets/components/001.png'
import two from '../../assets/components/002.png'
import three from '../../assets/components/003.png'
import four from '../../assets/components/004.png'
import five from '../../assets/components/005.png'
import end1 from  '../../assets/components/end1.png'
import ImgOpenHair from "../../assets/openHair1.png";
import ImgProduct from "../../assets/producter1.png";
import ImgOperation from "../../assets/operation1.png";
import ImgDesigner from "../../assets/designer1.png";
import ImgAdmin from "../../assets/admin1.png";

class End extends Component {
	state = {
		backgroundImg: '',
		endFrame: '',
		leave: true,
		innerPicture: '',
		endFrameText: '',
		numberImg: ''
	}

	goBack = () => {
		location.reload()
	}

	componentDidMount () {
		let number = Math.floor((Math.random() * 10) + 1)
		if (number > 4) {
			this.setState({
				endFrameText: 'NCUHOME会一直是你身后的驿站，在你坚定信念时，记得再来看看'
			})
		} else if (number < 4) {
			this.setState({
				endFrameText: '欢迎来到属于你的国度，在NCUHOME，揭开你的新篇章吧!'
			})
		} else {
			this.setState({
				endFrameText: 'NCUHOME的大门已经敞开，你难道仍心存摇摆?'
			})
		}
		switch (this.props.group) {
			case '研发组':
				this.setState({
					backgroundImg: ImgOpenHair,
					numberImg: five
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: ImgProduct,
					numberImg: one
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: ImgOperation,
					numberImg: two
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: ImgDesigner,
					numberImg: three
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: ImgAdmin,
					numberImg: four
				})
				break
			default:
				this.setState({
					backgroundImg: ImgAdmin,
					numberImg: one
				})
		}
		this.getPicture()
	}

	getPicture = async () => {
		let data = {
			username: this.props.username
		}
		let result = await API.getPicture(data)
		this.setState({
			innerPicture: result
		})
	}

	render () {
		return (
			<CSSTransition
				in={this.state.leave}
				appear={true}
				classNames="fade"
				timeout={500}
			>
				<div className='end'>
					<img className='numberImg' src={this.state.numberImg} alt='数字'/>
					<img className='backgroundImg' src={this.state.backgroundImg} alt='背景'/>
					<img className='endFrame' src={end1} alt='结尾框'/>
					<img className='innerPicture' src={this.state.innerPicture} alt='框内图'/>
					<img className='button' src={button} alt='按钮'/>
					<h5 className='endText'>
						{this.state.endFrameText}
					</h5>
					<button onClick={this.goBack}>
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
		group: state.group,
		username: state.username
	}
}

export default connect(mapStateToProps, null)(End)