import Server from './server'

class API extends Server {
  /**
   *  用途：发送用户名
   *  @url
   *  返回status为1表示成功
   *  @method get
   *  @return {promise}
   */

  async postUserName (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/username', data)
      if (result.status === 1 && result instanceof Object) {
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
  async sendClass (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/sendClass', data)
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
  async nextQuestion (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/nextQuestion', data)
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
  async sendPuzzle (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/sendPuzzle', data)
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
   * 获取用户消息
   * @param {*} get的拼接参数
   */

  async getUser (data) {
    try {
      // eslint-disable-next-line no-undef
      let result = await this.axios('get', '/v1/user' + getUrlConcat(data))
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '获取用户信息失败',
          response: result
        }
        throw err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 发送点的信息
   */

  async sendPoint (data) {
    try {
      let result = await this.axios('post', 'http://47.102.147.80:8080/api/posts', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '创建失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 获取信息盒子
   */

  async getInfoBox (data) {
    try {
      let result = await this.axios('get', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/getInfoBox', data)
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
   * 发送点的信息
   */

  async tokenVerify (data) {
    try {
      let result = await this.axios('post', '', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: 'token验证失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 获取所有点的大致信息
   */

  async getAllPoint (data) {
    try {
      let result = await this.axios('get', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/getAllPoint', data)
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
   * 获取一个点的详细信息
   */

  async getOnePoint (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/getOnePoint', data)
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
   * 发送一个已经编辑过的点
   */

  async sendNewPoint (data) {
    try {
      let result = await this.axios('put', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/sendNewPoint', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '发送失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 删除一个点
   */

  async deletePoint (data) {
    try {
      let result = await this.axios('post', 'https://www.easy-mock.com/mock/5c01297d4ed9b43d7590d554/example/deletePoint', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '删除失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 重置密码
   */

  async resetPassword (data) {
    try {
      let result = await this.axios('post', '', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '重置失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 修改邮箱
   */

  async emailChange (data) {
    try {
      let result = await this.axios('put', '', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '修改失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }

  /**
   * 确认修改邮箱
   */

  async confirmEmailChange (data) {
    try {
      let result = await this.axios('get', '', data)
      if (result instanceof Object) {
        return result || []
      } else {
        let err = {
          tip: '失败',
          response: result
        }
        return err
      }
    } catch (err) {
      throw err
    }
  }
}

export default new API()
