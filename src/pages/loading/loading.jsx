import React, {Component} from 'react'
import Lottie from 'lottie-web'
import animate from '../../assets/loading.json'
import {Progress} from 'antd'
import 'antd/dist/antd.css'
import './loading.scss'
import '../../index.css'
import {CSSTransition} from "react-transition-group"
import page1 from '../../assets/components/001.png'
import page2 from '../../assets/components/002.png'
import page3 from '../../assets/components/003.png'
import page4 from '../../assets/components/004.png'
import page5 from '../../assets/components/005.png'
import page6 from '../../assets/components/Admin.png'
import page7 from '../../assets/components/answerFrame.png'
import page8 from '../../assets/components/boom.png'
import page9 from '../../assets/components/button.png'
import page10 from '../../assets/components/confirmInput.png'
import page11 from '../../assets/components/designer.png'
import page12 from '../../assets/components/end1.png'
import page13 from '../../assets/components/end2.png'
import page14 from '../../assets/components/end3.png'
import page15 from '../../assets/components/input.png'
import page16 from '../../assets/components/openHair.png'
import page17 from '../../assets/components/operation.png'
import page18 from '../../assets/components/product.png'
import page19 from '../../assets/components/puzzleFrame.png'
import page20 from '../../assets/components/restartGame.png'

class LottieControl extends Component {
	state = {
		leave: true,
		percent: 0,
		pictures: [
			'page1',
			'page2',
			'page3',
			'page4',
			'page5',
			'page6',
			'page7',
			'page8',
			'page9',
			'page10',
			'page11',
			'page12',
			'page13',
			'page14',
			'page15',
			'page16',
			'page17',
			'page18',
			'page19',
			'page20',
			'page21',
			'page22',
			'page23',
			'page24',
			'page25',
			'page26',
			'page27',
			'page28',
			'page29',
			'page30',
			'page31',
			'page32',
			'page33',
			'page34',
			'page35'
		],
		pictureSrc: [
			page1,
			page2,
			page3,
			page4,
			page5,
			page6,
			page7,
			page8,
			page9,
			page10,
			page11,
			page12,
			page13,
			page14,
			page15,
			page16,
			page17,
			page18,
			page19,
			page20,
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dh25a7j30af0ijmz5.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dgd6d5j30af0ijwfo.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dfwgrmj30af0ijjtk.jpg',
			'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677df6yckj30af0ijmyp.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677demsgoj30af0ij75m.jpg',
			'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddzubxj30af0ijgnj.jpg',
			'http://wx3.sinaimg.cn/mw690/005JHgrHgy1g677ddcm1qj30af0ijdh4.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dcu4wzj30af0ijtaw.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677dc891jj30af0ijwg2.jpg',
			'http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677db43ijj30af0ij40v.jpg',
			'http://wx4.sinaimg.cn/mw690/005JHgrHgy1g677damo5mj30af0ijwfs.jpg',
			'http://wx2.sinaimg.cn/mw690/005JHgrHgy1g677da4x7ij30af0ijwft.jpg',
			'http://wx1.sinaimg.cn/mw690/005JHgrHgy1g677d9obdyj30af0ijq4e.jpg',
			'http://wx4.sinaimg.cn/mw690/005JHgrHgy1g5wrvji71ej306o06o0ta.jpg',
			'http://wx2.sinaimg.cn/mw690/005JHgrHgy1g5wrp3ebbdj306o06omxm.jpg',
		]
	};

	componentDidMount () {
		let loading = 0

		Lottie.loadAnimation({
			rendererSettings: {
				preserveAspectRatio: 'xMidYMid slice'
			},
			container: document.getElementById('lottie'),
			renderer: 'svg',
			loop: true,
			autoplay: true,
			animationData: animate,
		})

		for (let i = 0; i < this.state.pictures.length; i++) {
			this.state.pictures[i] = new Image()
			this.state.pictures[i].src = this.state.pictureSrc[i]
			let watching = setInterval(() => {
				if (this.state.pictures[i].complete) {
					loading++
					let progress = (loading / this.state.pictures.length) * 100
					this.setState({
						percent: Number(progress.toFixed(0))
					})
					if (this.state.percent === 100) {
						setTimeout(() => {
							this.setState(
								{
									leave: false
								}
							)
						}, 1000)
						setTimeout(() => {
							this.props.history.replace('/home')
						}, 1500)
					}
					clearInterval(watching)
				}
			}, 1)
		}
	}

	render() {
		return (
			<CSSTransition
				in={this.state.leave}
				appear={true}
				classNames="fade"
				timeout={500}
			>
				<div>
					<Progress className='progress' type="circle" width={100} percent={this.state.percent} />
					<div id="lottie">
					</div>
				</div>
			</CSSTransition>
		)
	}
}

export default LottieControl
