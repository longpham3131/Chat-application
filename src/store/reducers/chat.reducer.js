import {GET_CHAT_USER, GET_CHAT_DETAIL, GET_MESSAGES, GET_LATEST_MESSAGE} from '../constants/chat.constant'

const initialState = {
  chatUser: '',
  chatDetail: {},
  messages: [],
  latestMessage: [],
};

export const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return {...state, chatUser: payload};
    case GET_CHAT_DETAIL:
      return {...state, chatDetail: payload}
    case GET_MESSAGES: 
      return {...state, messages: payload}
    case GET_LATEST_MESSAGE:
      return {...state, latestMessage: payload}
    default:
      return state;
  }
};
