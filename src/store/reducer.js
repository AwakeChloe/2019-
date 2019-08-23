import * as user from './action-type'

let defaultState = {
  hasLogin: false,
  question: [],
  username: ''
}

// 用户消息
export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case user.REGISTER_SUCCESS:
      return {
        ...state,
        hasLogin: true,
        username: action.username
      }
    case user.GET_QUESTION:
      return {
        ...state,
        question: action.question
      }
    case user.LOAD_GROUPS:
      return {
        ...state,
        group: action.group
      }
    default:
      return state
  }
}