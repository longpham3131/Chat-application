import {GET_CHAT_USER} from '../constants/chat.constant'

const initialState = {
  chatUser: '',
};

export const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return {...state, chatUser: payload};
    default:
      return state;
  }
};
