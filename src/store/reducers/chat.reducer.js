import {GET_CHAT_USER, GET_CHAT_DETAIL, GET_MESSAGES, GET_LATEST_MESSAGE, PATCH_READ_MESSAGE, GET_OTHER_USERS} from '../constants/chat.constant'

const initialState = {
  chatUser: '',
  chatDetail: {},
  messages: [],
  latestMessage: [],
  readMessage: {},
  otherUsers: []
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return {...state, chatUser: payload};
    case GET_CHAT_DETAIL:
      return {...state, chatDetail: payload}
    case GET_MESSAGES: 
      return {...state, messages: payload}
    case GET_LATEST_MESSAGE:
      return {...state, latestMessage: payload}
    case PATCH_READ_MESSAGE:
      return {...state, readMessage: payload}
    case GET_OTHER_USERS:
      return {...state, otherUsers: payload}
    default:
      return state;
  }
};
