import {GET_CHAT_USER, GET_CHAT_DETAIL} from '../constants/chat.constant'

const initialState = {
  chatUser: '',
  chatDetail: {}
};

export const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return {...state, chatUser: payload};
    case GET_CHAT_DETAIL:
      return {...state, chatDetail: payload}
    default:
      return state;
  }
};
