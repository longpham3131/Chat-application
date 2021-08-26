import axios from "axios";
import {
  GET_CHAT_DETAIL,
  GET_MESSAGES,
  GET_LATEST_MESSAGE,
  PATCH_READ_MESSAGE,
  GET_CHAT_LIST,
  CHANGE_SELECTED_CHAT,
  LOADING_MESSAGE,
  CREATE_CHAT,
} from "../constants/chat.constant";

const updateLoading = (status) => {
  return { type: LOADING_MESSAGE, payload: status };
};

//Get chat detail

export const getChatDetail = (chatId) => {
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

export const getMessages = (chatId) => {
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
  return { type: GET_MESSAGES, payload: { data, isCompleted: true } };
};
//Get latest message
export const getLatestMess = (chatId, countMessage = 1) => {
  return async (dispatch) => {
    dispatch(updateLoading(true));
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
      dispatch(updateLoading(false));
      dispatch(getLatestMessAction(data.data));
    } catch (error) {
      dispatch(updateLoading(false));
      console.log("ERR_MESSAGES", error);
    }
  };
};
const getLatestMessAction = (data) => {
  return { type: GET_LATEST_MESSAGE, payload: data };
};

//PATCH read message
export const patchReadMessage = (chatId, lastRead) => {
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

//GET_CHAT_LIST
export const getChatList = () => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      const result = await axios.get(`https://api.chatengine.io/chats/`, {
        headers: authObject,
      });

      dispatch(getChatListAction(result.data));
    } catch (error) {
      console.log("ERR_GET_CHAT_LIST", error);
    }
  };
};

const getChatListAction = (data) => {
  return { type: GET_CHAT_LIST, payload: data };
};

// CHANGE_SELECTED_CHAT
export const changeSelectedChat = (chatId) => {
  return async (dispatch) => {
    console.log("CHANGE", chatId);
    await dispatch(changeSelectedChatAction(chatId));
    await dispatch(getMessages(chatId));
    await dispatch(getChatDetail(chatId));
  };
};

const changeSelectedChatAction = (chatId) => {
  return { type: CHANGE_SELECTED_CHAT, payload: chatId };
};

//CREATE CHAT
export const createChat = (usernames, title) => {
  return async (dispatch) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const authObject = {
      "Project-ID": "e078c6b8-8d92-4d9b-a130-9f7c1b64406f",
      "User-Name": username,
      "User-Secret": password,
    };
    try {
      const result = await axios.put(
        `https://api.chatengine.io/chats/`,
        {
          usernames,
          title,
          is_direct_chat: false,
        },
        {
          headers: authObject,
        }
      );
      await dispatch(
        createChatAction({
          type: "CREATE_CHAT",
          message: "Create new chat success",
          status: "success",
        })
      );
      await dispatch(getChatList());
      await dispatch(changeSelectedChat(result.data.id));
    } catch (error) {
      console.log("ERR_CREATE_CHAT", error);
      dispatch(
        createChatAction({
          type: "CREATE_CHAT",
          message: "Create new chat fail",
          status: "fail",
        })
      );
    }
  };
};
const createChatAction = (notify) => {
  return { type: CREATE_CHAT, payload: notify };
};
