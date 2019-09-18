import React, {Component} from 'react'
import {CSSTransition} from "react-transition-group"
import {connect} from 'react-redux'
import '../../index.css'
import {Redirect} from 'react-router-dom'
import './answer.scss'
import one from '../../assets/components/001.png'
import two from '../../assets/components/002.png'
import three from '../../assets/components/003.png'
import four from '../../assets/components/004.png'
import five from '../../assets/components/005.png'
import answerFrame from '../../assets/components/answerFrame.png'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import API from '@/api/api'

class Answer extends Component {
	state = {
		leave: true,
		question: [],
		selectIndex: -1,
		answer: '',
		backgroundImg: '',
		numberImg: ''
	}

	toggle = (event) => {
		let index = Number(event.target.getAttribute('index'))

		this.setState({
			answer: event.target.getAttribute('value')
		})
		this.state.selectIndex === index ? this.setState({
			selectIndex: -1
		}) : this.setState({
			selectIndex: index
		})
	}

	nextQuestion = async (event) => {
		let index = Number(event.target.getAttribute('index')) + 1
		if (index < 6) {
			let data = {
				question: event.target.getAttribute('question'),
				question_id: index,
				answer: this.state.answer,
				groups: this.props.group,
				username: this.props.username
			}
			if (!this.state.answer) {
				return
			}
			let result = await API.nextQuestion(data)
			let u = navigator.userAgent
			let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
			if (result.spark === true && !isIOS) {
				this.setState(
					{
						leave: false
					}
				)
				setTimeout(() => {
					this.props.history.replace('/boom')
				}, 500)
			} else if (result.status === 1) {
				this.setState({
					selectIndex: -1,
					answer: '',
				})
				if (index > 4) {
					this.setState(
						{
							leave: false
						}
					)
					setTimeout(() => {
						this.props.history.replace('/end')
					}, 500)
				} else if (index < 5) {
					let question = this.state.question
					question[index] = this.props.question[index].data
					this.setState({
						question: question
					})
					this.state.swiper.update()
					this.state.swiper.slideTo(index, 500, false)
				}
			}
		}
	}

	componentDidMount () {
		// eslint-disable-next-line no-unused-vars
		let swiper = new Swiper('.swiper-container', {
			pagination: {
				el: '.swiper-pagination',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
				hideOnClick: true,
				hiddenClass: 'my-button-hidden',
				disabledClass: 'my-button-disabled'
			}
		})
		let question = []

		this.setState({
			swiper: swiper
		})
		question.push(this.props.question[0].data)
		this.setState({
			question: question
		})
		switch (this.props.group) {
			case '研发组':
				this.setState({
					backgroundImg: 'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddzubxj30af0ijgnj.jpg',
					numberImg: five
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: 'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dfwgrmj30af0ijjtk.jpg',
					numberImg: one
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: 'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677df6yckj30af0ijmyp.jpg',
					numberImg: two
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: 'http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677db43ijj30af0ij40v.jpg',
					numberImg: three
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: 'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg',
					numberImg: four
				})
				break
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
				<div className='answer'>
					<img src={this.state.backgroundImg} alt='背景'/>
					<img className='answerFrame' src={answerFrame} alt='答题框'/>
					<div className='question'>
						<img className='numberImg' src={this.state.numberImg} alt='数字'/>
						<div className='swiper-container'>
							<div className='swiper-wrapper'>
								{this.state.question.map((item, index) => (
									<div className='swiper-slide' key={index}>
										<h3 className='h3'>
											{item.question}
										</h3>
										<ul>
											<li onClick={this.toggle} index='1' value='A' className={this.state.selectIndex === 1 ? 'beSelect' : null}>A&#32;{item.A}</li>
											<li onClick={this.toggle} index='2' value='B' className={this.state.selectIndex === 2 ? 'beSelect' : null}>B&#32;{item.B}</li>
											<li onClick={this.toggle} index='3' value='C' className={this.state.selectIndex === 3 ? 'beSelect' : null}>C&#32;{item.C}</li>
										</ul>
										<button index={index} question={item.question} onClick={this.nextQuestion}>
											下一题
										</button>
									</div>
								))}
							</div>
						</div>
						<div className="swiper-pagination">
						</div>
						<div className="swiper-button-prev">
						</div>
						<div className="swiper-button-next">
						</div>
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
		question: state.question,
		group: state.group,
		username: state.username
	}
}

export default connect(mapStateToProps, null)(Answer)