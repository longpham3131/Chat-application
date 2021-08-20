import axios from "axios";
import {
  GET_CHAT_USER,
  GET_CHAT_DETAIL,
  GET_MESSAGES,
  GET_LATEST_MESSAGE,
  PATCH_READ_MESSAGE,
  GET_OTHER_USERS,
} from "../constants/chat.constant";

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

//Get chat detail

export const getChatDetail = (chatId = 49601) => {
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
        `https://api.chatengine.io/chats/${chatId}/`,
        { headers: authObject }
      );
      dispatch(getChatDetailAction(data.data));
    } catch (error) {
      console.log("ERR_CHAT_DETAIL", error);
    }
  };
};
const getChatDetailAction = (data) => {
  return { type: GET_CHAT_DETAIL, payload: data };
};

// Get message

export const getMessages = (chatId = 49601) => {
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
        `https://api.chatengine.io/chats/${chatId}/messages`,
        { headers: authObject }
      );

      dispatch(getMessagesAction(data.data));
    } catch (error) {
      console.log("ERR_MESSAGES", error);
    }
  };
};
const getMessagesAction = (data) => {
  return { type: GET_MESSAGES, payload: data };
};
//Get latest message
export const getLatestMess = (chatId = 49601, countMessage = 1) => {
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
        `https://api.chatengine.io/chats/${chatId}/messages/latest/${countMessage}/`,
        { headers: authObject }
      );

      dispatch(getLatestMessAction(data.data));
    } catch (error) {
      console.log("ERR_MESSAGES", error);
    }
  };
};
const getLatestMessAction = (data) => {
  return { type: GET_LATEST_MESSAGE, payload: data };
};

//PATCH reag message
export const patchReadMessage = (chatId = 49601, lastRead) => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    const body = { last_read: lastRead };
    try {
      const data = await axios.patch(
        `https://api.chatengine.io/chats/${chatId}/people/`,
        body,
        { headers: authObject }
      );

      dispatch(patchReadMessageAction(data.data));
    } catch (error) {
      console.log("ERR_READ_MESSAGE", error);
    }
  };
};
const patchReadMessageAction = (data) => {
  return { type: PATCH_READ_MESSAGE, payload: data };
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
