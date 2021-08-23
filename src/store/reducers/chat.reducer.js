import {
  GET_CHAT_DETAIL,
  GET_MESSAGES,
  GET_LATEST_MESSAGE,
  PATCH_READ_MESSAGE,
  GET_CHAT_LIST,
  CHANGE_SELECTED_CHAT,
} from "../constants/chat.constant";

const initialState = {
  chatUser: "",
  chatList: [],
  chatDetail: {},
  messages: [],
  latestMessage: [],
  readMessage: {},
  otherUsers: [],
  selectedChat: null,
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_DETAIL:
      return { ...state, chatDetail: payload };
    case GET_MESSAGES:
      return { ...state, messages: payload };
    case GET_LATEST_MESSAGE:
      return { ...state, latestMessage: payload };
    case GET_CHAT_LIST:
      return { ...state, chatList: payload };
    case PATCH_READ_MESSAGE:
      return { ...state, readMessage: payload };
    case CHANGE_SELECTED_CHAT:
      return { ...state, selectedChat: payload };
    default:
      return state;
  }
};
