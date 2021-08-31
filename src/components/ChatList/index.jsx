import "./styles/chatList.css";
import ChatCard from "./ChatCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  changeSelectedChat,
  createChat,
} from "../../store/actions/chat.action";
import Dialog from "../Utils/Dialog";
import { getAllUser } from "../../store/actions/user.action";
import { Form, Input, Button, Checkbox, Divider } from "antd";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const ChatList = ({ chats }) => {
  // const [chatList, setchatList] = useState([])
  // console.log("PROPS", props);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const users = useSelector((state) => state.userReducer.allUser);
  const notify = useSelector((state) => state.chatReducer.notify);
  const dispatch = useDispatch();

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [contentDialog, setContentDialog] = useState(null);

  const [newChatTitle, setNewChatTitle] = useState("");
  const [selectedChatUsers, setSelectedChatUsers] = useState([
    localStorage.getItem("username"),
  ]);

  useEffect(() => {
    if (!selectedChat) {
      dispatch(changeSelectedChat(chatList[0]?.id));
    }
  }, [chatList]);

  useEffect(() => {
    if (notify.type) {
      switch (notify.type) {
        case "CREATE_CHAT":
          notify.status === "success"
            ? NotificationManager.success(notify.message, "Create chat")
            : NotificationManager.error(notify.message, "Create chat");
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!");
          break;
        default:
          break;
      }
    }
  }, [notify]);

  useEffect(() => {
    dispatch(getChatList());
  }, [chats ? chats[selectedChat] : ""]);

  const renderChatCard = () => {
    return chatList.map((chat, index) => {
      return (
        <div key={`chat_${index}`} style={{ width: "100%" }}>
          <ChatCard chat={chat} selected={selectedChat} />
        </div>
      );
    });
  };

  //Create group chat
  const handleShowDialog = () => {
    dispatch(getAllUser());
    setIsShowDialog(true);
  };
  const onChangeCheckbox = (e, username) => {
    // console.log(`checked = ${e.target.checked} - ${username}`);
    const checked = e.target.checked;
    let newList = [...selectedChatUsers];
    if (checked) {
      newList.push(username);
    } else {
      newList = selectedChatUsers.filter(
        (usernameCurrent) => usernameCurrent !== username
      );
    }
    setSelectedChatUsers(newList);
  };
  const handleAddGroupChat = () => {
    dispatch(createChat(selectedChatUsers, newChatTitle));
    setNewChatTitle("");
    setSelectedChatUsers([]);
    setIsShowDialog(false);
  };
  useEffect(() => {
    setContentDialog(
      <div>
        <div className="mb-2">
          <span style={{ width: "100px" }}>Chat title:</span>
          <Input
            placeholder="Input chat title"
            value={newChatTitle}
            onChange={(e) => {
              setNewChatTitle(e.target.value);
            }}
          />
        </div>
        <span>Choose member for this group:</span>
        {users &&
          users.map((user, index) => {
            if (user.username !== localStorage.getItem("username")) {
              return (
                <div
                  style={{ width: "100%", margin: "10px" }}
                  key={`index_checkbox_${index}`}
                >
                  <Checkbox
                    onChange={(e) => {
                      onChangeCheckbox(e, user?.username);
                    }}
                    checked={
                      selectedChatUsers.findIndex(
                        (username) => username === user.username
                      ) !== -1
                        ? true
                        : false
                    }
                    key={`123_${index}`}
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={user?.avatar}
                        alt="user-avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <span>
                        {user.username} - ({user.first_name + user.last_name})
                      </span>
                    </div>
                  </Checkbox>
                </div>
              );
            }
          })}
      </div>
    );
  }, [users, selectedChatUsers, newChatTitle]);

  return (
    <div className="chatList">
      <div className="chatList__header">
        <h3>My Chat List</h3>
        <button
          className="chatList__header--button"
          title="Add group"
          onClick={handleShowDialog}
        >
          <i className="fa fa-users"></i>+
        </button>
        <Dialog
          isShow={isShowDialog}
          content={contentDialog}
          type={"form"}
          title={"Create group chat"}
          handleHideDialog={() => {
            setIsShowDialog(false);
          }}
          onSubmit={handleAddGroupChat}
        />
      </div>
      <div className="chatList__body">{chatList && renderChatCard()}</div>
      <NotificationContainer />
    </div>
  );
};
export default ChatList;
