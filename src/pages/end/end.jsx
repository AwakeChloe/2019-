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
import copy from  '../../assets/components/copy.jpg'

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
		window.location = 'http://promote.mehacker.cn'
	}

	copyUrl2 = () => {
		// eslint-disable-next-line no-console
		console.log(1)
		let input = document.getElementById('biao')
		input.select()
		document.execCommand('Copy', false, null)
		alert('网页地址已复制到剪切板')
	}

	componentDidMount () {
		let number = Math.floor((Math.random() * 10) + 1)
		if (number > 4) {
			this.setState({
				endFrameText: '小家园在魔镜里看见，你就是我们想要的样子。天赋异禀的小巫师，欢迎来到NCUHOME魔法学院，和我们一起干酷酷的事~'
			})
		} else if (number < 4) {
			this.setState({
				endFrameText: '你就是NCUHOME星系走失的小王子，是时候回来看看自己的玫瑰了~她究竟在哪颗星球静静地等待着你，我的小王子，你找到了吗?'
			})
		} else {
			this.setState({
				endFrameText: '你就像精灵般的彗星，途径NCUHOME星系的引力场。如果你也坚信我们的缘分不仅止于擦肩，那么穿过我们的大气层下来耍耍好不好?'
			})
		}
		switch (this.props.group) {
			case '研发组':
				this.setState({
					backgroundImg: "http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddzubxj30af0ijgnj.jpg",
					numberImg: five
				})
				break
			case '产品组':
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dfwgrmj30af0ijjtk.jpg",
					numberImg: one
				})
				break
			case '运营组':
				this.setState({
					backgroundImg: "http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677df6yckj30af0ijmyp.jpg",
					numberImg: two
				})
				break
			case '设计组':
				this.setState({
					backgroundImg: "http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677db43ijj30af0ij40v.jpg",
					numberImg: three
				})
				break
			case '行政组':
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg",
					numberImg: four
				})
				break
			default:
				this.setState({
					backgroundImg: "http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg",
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
					<img className='copy' onClick={this.copyUrl2} src={copy} alt='按钮'/>
					<h5 className='endText'>
						{this.state.endFrameText}
					</h5>
					<p>
						重新游戏
					</p>
					<input value='http://promote.mehacker.cn' id='biao'>
					</input>
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