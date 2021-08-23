import "./styles/chatList.css";
import ChatCard from "./ChatCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  changeSelectedChat,
} from "../../store/actions/chat.action";
const ChatList = ({ chats }) => {
  // const [chatList, setchatList] = useState([])
  // console.log("PROPS", props);
  const chatList = useSelector((state) => state.chatReducer.chatList);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getChatList());
  // }, []);

  useEffect(() => {
    if (!selectedChat) {
      dispatch(changeSelectedChat(chatList[0]?.id));
    }
  }, [chatList]);

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
  return (
    <div className="chatList">
      {/* <div className="chatList__header">
        <h3>My chatList</h3>
      </div> */}
      <div className="chatList__body">{chatList && renderChatCard()}</div>
    </div>
  );
};
export default ChatList;
