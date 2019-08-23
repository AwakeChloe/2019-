import React, {Component} from 'react'
import Pics from './components/pics'
import './puzzle.scss'
import {CSSTransition} from "react-transition-group"
import '../../index.css'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {TweenMax} from "gsap";
import puzzleFrame from '../../assets/components/puzzleFrame.png'
import API from '@/api/api'

class Puzzle extends Component {

	state = {
		backgroundImg: '',
		leave: true,
		randomPics: [],
		reallyPics: [],
		shadowShow: -1,
		backgroundImage: ''
	}

	sendPuzzle = async () => {
		let data = {
			puzzle: this.state.reallyPics
		}
		let result = await API.sendPuzzle(data)
		if (result.status === 1) {
			this.setState(
				{
					leave: false
				}
			)
			setTimeout(() => {
				this.props.history.replace('/end')
			}, 500)
		}
	}

	initData = () => {
		let newState = {}
		newState.randomPics = []
		let i
		for (i = 0; i < 9; i++) {
			if (Math.round(Math.random()) > 0.5) {
				newState.randomPics.unshift(i)
			} else {
				newState.randomPics.push(i)
			}
		}
		newState.reallyPics = newState.randomPics.concat()
		this.setState({
			reallyPics: newState.reallyPics,
			randomPics: newState.randomPics
		})
	}

	cutSliceX = index => {
		return index % 3 * 80
	}

	cutSliceY = index => {
		return Math.floor(index / 3) * 80
	}

	getDirection = (startX, startY, endX, endY) => {
		let angX = endX - startX
		let angY = endY - startY
		let result = 0;

		//如果滑动距离太短
		if (Math.abs(angX) < 30 && Math.abs(angY) < 30) {
			return result;
		}

		let angle = Math.atan2(angY, angX) * 180 / Math.PI;
		if (angle >= -135 && angle <= -45) {
			result = 1
		} else if (angle > 45 && angle < 135) {
			result = 2
		} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
			result = 3
		} else if (angle >= -45 && angle <= 45) {
			result = 4
		}

		return result
	}

	componentDidMount () {
		let number = Math.floor((Math.random() * 10) + 1)
		if (number > 5) {
			this.setState({
					backgroundImage: "url('http://wx2.sinaimg.cn/mw690/005JHgrHgy1g5wrp3ebbdj306o06omxm.jpg')"
				}
			)
		} else {
			this.setState({
					backgroundImage: "url('http://wx4.sinaimg.cn/mw690/005JHgrHgy1g5wrvji71ej306o06o0ta.jpg')"
				}
			)
		}
		switch (this.props.group) {
			case '研发组':
				this.setState({
					backgroundImg: 'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddzubxj30af0ijgnj.jpg',
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dfwgrmj30af0ijjtk.jpg",
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: "http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677df6yckj30af0ijmyp.jpg",
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: "http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677db43ijj30af0ij40v.jpg",
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg",
				})
				break
			default:
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg",
				})
				break
		}
		this.initData()
		let index
		let touchPics
		let startX
		let startY
		document.addEventListener("touchstart", function(e) {
			startX = e.touches[0].pageX
			startY = e.touches[0].pageY
			touchPics = document.elementFromPoint(startX, startY)
		}, false);
		//手指离开屏幕
		document.addEventListener("touchend", (e) => {
			let endX, endY
			let state = {}
			state.reallyPics = this.state.reallyPics
			let n, dom, top, beTop, left, beLeft
			endX = e.changedTouches[0].pageX
			endY = e.changedTouches[0].pageY
			let direction = this.getDirection(startX, startY, endX, endY)
			switch (direction) {
				case 1:
					index = touchPics.getAttribute('index')
					dom = document.elementFromPoint(startX, startY - 80)
					top = touchPics.style.top.split('p')
					top = Number(top[0])
					beTop = dom.style.top.split('p')
					beTop = Number(beTop[0])
					if (index !== null && dom.getAttribute('index') !== null) {
						TweenMax.to(touchPics, .1, {
							top: top - 80,
						})
						TweenMax.to(dom, .1, {
							top: beTop + 80,
						})
						touchPics.setAttribute('index', index - 3)
						dom.setAttribute('index', index)
						n = state.reallyPics[index]
						state.reallyPics[index] = state.reallyPics[index - 3]
						state.reallyPics[index - 3] = n
						this.setState({
							reallyPics: state.reallyPics
						})
					}
					break
				case 2:
					index = touchPics.getAttribute('index')
					dom = document.elementFromPoint(startX, startY + 80)
					top = touchPics.style.top.split('p')
					top = Number(top[0])
					beTop = dom.style.top.split('p')
					beTop = Number(beTop[0])
					if (index !== null && dom.getAttribute('index') !== null) {
						TweenMax.to(touchPics, .1, {
							top: top + 80,
						})
						TweenMax.to(dom, .1, {
							top: beTop - 80,
						})
						touchPics.setAttribute('index', Number(index) + 3)
						dom.setAttribute('index', index)
						n = state.reallyPics[index]
						state.reallyPics[index] = state.reallyPics[Number(index) + 3]
						state.reallyPics[Number(index) + 3] = n
						this.setState({
							reallyPics: state.reallyPics
						})
					}
					break
				case 3:
					index = touchPics.getAttribute('index')
					dom = document.elementFromPoint(startX - 80, startY)
					left = touchPics.style.left.split('p')
					left = Number(left[0])
					beLeft = dom.style.left.split('p')
					beLeft = Number(beLeft[0])
					if (index !== null && dom.getAttribute('index') !== null) {
						TweenMax.to(touchPics, .1, {
							left: left - 80,
						})
						TweenMax.to(dom, .1, {
							left: beLeft + 80,
						})
						touchPics.setAttribute('index', Number(index) - 1)
						dom.setAttribute('index', index)
						n = state.reallyPics[index]
						state.reallyPics[index] = state.reallyPics[Number(index) - 1]
						state.reallyPics[Number(index) - 1] = n
						this.setState({
							reallyPics: state.reallyPics
						})
					}
					break
				case 4:
					index = touchPics.getAttribute('index')
					dom = document.elementFromPoint(startX + 80, startY)
					left = touchPics.style.left.split('p')
					left = Number(left[0])
					beLeft = dom.style.left.split('p')
					beLeft = Number(beLeft[0])
					if (index !== null && dom.getAttribute('index') !== null) {
						TweenMax.to(touchPics, .1, {
							left: left + 80,
						})
						TweenMax.to(dom, .1, {
							left: beLeft - 80,
						})
						touchPics.setAttribute('index', Number(index) + 1)
						dom.setAttribute('index', index)
						n = state.reallyPics[index]
						state.reallyPics[index] = state.reallyPics[Number(index) + 1]
						state.reallyPics[Number(index) + 1] = n
						this.setState({
							reallyPics: state.reallyPics
						})
					}
					break
				default:
			}
		}, false)
	}

	render () {
		return (
			<CSSTransition
				in={this.state.leave}
				appear={true}
				classNames="fade"
				timeout={500}
			>
				<div className='puzzle'>
					<img src={this.state.backgroundImg} alt='背景'/>
					<img className='puzzleFrame' src={puzzleFrame} alt='拼图框'/>
					<div className='puzzleArea'>
						<button onClick={this.sendPuzzle}>
						</button>
						{this.state.randomPics.map((picsNumber, index) => (
							<Pics key={index} index={index} backgroundImage={this.state.backgroundImage} positionX={this.cutSliceX(picsNumber)} positionY={this.cutSliceY(picsNumber)}/>
						))}
					</div>
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

export default connect(mapStateToProps, null)(Puzzle)