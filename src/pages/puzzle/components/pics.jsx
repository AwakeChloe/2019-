import React, {Component} from 'react'
import './pics.scss'

class Pics extends Component {

	render () {
		return (
			<div
				className='pics'
				index={this.props.index}
				style={{
				backgroundPosition: '-' + this.props.positionX + 'px ' + '-' + this.props.positionY + 'px',
				position: 'relative',
				left: 0,
				top: 0
			}}>
			</div>
		)
	}
}

export default Pics