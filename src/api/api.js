import Server from './server'

class API extends Server {
	/**
	 *  用途：发送用户名
	 *  @url
	 *  返回status为1表示成功
	 *  @method get
	 *  @return {promise}
	 */

	async postUserName(data) {
		try {
			let result = await this.axios('post', 'http://39.107.27.139:80/user/', data)
			if (result instanceof Object) {
				return result || []
			} else {
				let err = {
					tip: '注册失败',
					response: result
				}
				throw err
			}
		} catch (err) {
			throw err
		}
	}

	/**
	 *  用途：发送组别
	 *  @url
	 *  @method post
	 *  @return {promise}
	 */
	async sendClass(data) {
		try {
			let result = await this.axios('post', 'http://39.107.27.139:80/choise/', data)
			if (result instanceof Object) {
				return result || []
			} else {
				let err = {
					tip: '选择失败',
					response: result
				}
				return err
			}
		} catch (err) {
			throw err
		}
	}

	/**
	 *  用途：提交此题答案
	 *  @url
	 *  @method post
	 *  @return {promise}
	 */
	async nextQuestion(data) {
		try {
			let result = await this.axios('post', 'http://39.107.27.139:80/score/', data)
			if (result instanceof Object) {
				return result || []
			} else {
				let err = {
					tip: '获取失败',
					response: result
				}
				return err
			}
		} catch (err) {
			throw err
		}
	}

	/**
	 *  用途：提交拼图
	 *  @method post
	 *  @return {promise}
	 */
	async sendPuzzle(data) {
		try {
			let result = await this.axios('post', 'http://39.107.27.139:80/nine/', data)
			if (result instanceof Object) {
				return result || []
			} else {
				let err = {
					tip: '提交失败',
					response: result
				}
				return err
			}
		} catch (err) {
			throw err
		}
	}

	/**
	 * 获取结尾页图片
	 */

	async getPicture(data) {
		let result = await this.getPic('post', 'http://39.107.27.139:80/image/', data)
		return result
	}
}

export default new API()
