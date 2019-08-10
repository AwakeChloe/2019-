import * as user from './action-type'

// 记录登录状态
export const hasRegister = (content) => {
  return {
    type: user.REGISTER_SUCCESS,
    username: content
  }
}

// 记录组别问题
export const loadQuestion = (content) => {
  return {
    type: user.GET_QUESTION,
    question: content
  }
}

// 记录组别
export const loadGroups = (content) => {
  return {
    type: user.LOAD_GROUPS,
    group: content
  }
}