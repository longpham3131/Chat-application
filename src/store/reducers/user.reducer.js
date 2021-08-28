import {
  CREATE_USER,
  GET_ALL_USER,
  GET_CHAT_USER,
  GET_OTHER_USERS,
} from "../constants/user.constant";

const initialState = {
  chatUser: "",
  otherUsers: [],
  allUser: [],
  createUser: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CHAT_USER:
      return { ...state, chatUser: payload };
    case GET_OTHER_USERS:
      return { ...state, otherUsers: payload };
    case GET_ALL_USER:
      return { ...state, allUser: payload };
    case CREATE_USER:
      return { ...state, createUser: payload };
    default:
      return state;
  }
};
