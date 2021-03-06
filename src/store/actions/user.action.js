import axios from "axios";
import {
  CREATE_USER,
  GET_ALL_USER,
  GET_CHAT_USER,
  GET_OTHER_USERS,
} from "../constants/user.constant";
import { getChatDetail } from "./chat.action";

// Get chat user
export const getChatUser = (username, password) => {
  return async (dispatch) => {
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authObject,
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      dispatch(getChatUserAction(""));
      window.location.reload();
    } catch (error) {
      dispatch(getChatUserAction("Username or password invalid"));
    }
  };
};

const getChatUserAction = (status) => {
  return { type: GET_CHAT_USER, payload: status };
};

//Create user
export const createUser = (data) => {
  return async (dispatch) => {
    const authObject = {
      "PRIVATE-KEY": "32ad916a-34a5-4937-9328-8c0ddaea471e",
    };
    try {
      const result = await axios.post(
        "https://api.chatengine.io/users/",
        data,
        {
          headers: authObject,
        }
      );
      console.log("result", result);
      dispatch(createUserAction(result));
    } catch (error) {
      console.log("ERR", error.response);
      dispatch(createUserAction(error.response));
    }
  };
};
const createUserAction = (data) => {
  return { type: CREATE_USER, payload: data };
};
//GET ALL USER
export const getAllUser = () => {
  return async (dispatch) => {
    const authObject = {
      "PRIVATE-KEY": "32ad916a-34a5-4937-9328-8c0ddaea471e",
    };
    try {
      const result = await axios.get("https://api.chatengine.io/users", {
        headers: authObject,
      });

      dispatch(getAllUSer(result.data));
    } catch (error) {
      console.log("ERR_GET_ALL_USER", error);
    }
  };
};

const getAllUSer = (data) => {
  return { type: GET_ALL_USER, payload: data };
};

//GET OTHER USER
export const getOtherUsers = (chatId) => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      const data = await axios.get(
        `https://api.chatengine.io/chats/${chatId}/others/`,
        { headers: authObject }
      );
      dispatch(getOtherUsersAction(data.data));
    } catch (error) {
      console.log("ERR_OTHER_USERS", error);
    }
  };
};
const getOtherUsersAction = (data) => {
  return { type: GET_OTHER_USERS, payload: data };
};

//POST ADD CHAT MEMBERS
export const postAddChatMember = (chatId, listNewMember) => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      await listNewMember.map((user) => {
        axios.post(
          `https://api.chatengine.io/chats/${chatId}/people/`,
          { username: user },
          { headers: authObject }
        );
      });
      setTimeout(() => {
        dispatch(getChatDetail(chatId));
      }, 2000);
    } catch (error) {
      console.log("ERR_OTHER_USERS", error);
    }
  };
};
//POST REMOVE CHAT MEMBER
export const putRemoveChatMember = (chatId, member) => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      await axios.put(
        `https://api.chatengine.io/chats/${chatId}/people/`,
        { username: member },
        { headers: authObject }
      );

      setTimeout(() => {
        dispatch(getChatDetail(chatId));
      }, 2000);
    } catch (error) {
      console.log("ERR_OTHER_USERS", error);
    }
  };
};
