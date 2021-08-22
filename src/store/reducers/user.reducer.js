import { GET_CHAT_USER, GET_OTHER_USERS } from "../constants/user.constant";

const initialState = {
  chatUser: "",
  otherUsers: [],
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return { ...state, chatUser: payload };
    case GET_OTHER_USERS:
      return { ...state, otherUsers: payload };
    default:
      return state;
  }
};
