import axios from "axios";
import { GET_CHAT_USER, GET_OTHER_USERS } from "../constants/user.constant";
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

//GET OTHER USER
export const getOtherUsers = (chatId = 49601) => {
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
      console.log("DATA USER", data);
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
export const postAddChatMember = (chatId = 49601, listNewMember) => {
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
export const putRemoveChatMember = (chatId = 49601, member) => {
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
