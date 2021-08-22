import "./styles/chatList.css";
import ChatCard from "./ChatCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatList,
  changeSelectedChat,
} from "../../store/actions/chat.action";
const ChatList = (props) => {
  // const [chats, setChats] = useState([])
  const chats = useSelector((state) => state.chatReducer.chatList);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getChatList());
  }, []);

  useEffect(() => {
    // // console.log("CHAT LIST", chats, selectedChat);
    // if (selectedChat === 0 || selectedChat === undefined) {
    //   console.log("CHAT LIST", chats, selectedChat);
    //   dispatch(changeSelectedChat(chats[0]?.id));
    // }
    dispatch(changeSelectedChat(chats[0]?.id));
  }, [chats]);

  const renderChatCard = () => {
    return chats.map((chat, index) => {
      return (
        <div key={`chat_${index}`} style={{ width: "100%" }}>
          <ChatCard chat={chat} />
        </div>
      );
    });
  };
  return (
    <div className="chatList">
      <div className="chatList__header">
        <h3>My Chats</h3>
      </div>
      <div className="chatList__body">{chats && renderChatCard()}</div>
    </div>
  );
};
export default ChatList;
