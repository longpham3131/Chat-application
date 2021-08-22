import moment from "moment";
import { useDispatch } from "react-redux";
import { changeSelectedChat } from "../../store/actions/chat.action";
import "./styles/chatCard.css";
const ChatCard = ({ chat }) => {
  //   console.log("CHAT", chat);
  const dispatch = useDispatch();
  const onChangeChat = () => {
    dispatch(changeSelectedChat(chat?.id));
  };
  return (
    <div className="chatCard" onClick={onChangeChat}>
      <p className="chatCard__title">{chat?.title}</p>
      <div className="d-flex justify-content-between align-items-center">
        <span>
          {chat?.last_message?.text
            ? chat?.last_message?.text
            : "No message here.."}
        </span>
        <span>
          {chat?.last_message?.created
            ? moment(chat?.last_message?.created).fromNow()
            : moment(chat?.created).fromNow()}
        </span>
      </div>
    </div>
  );
};
export default ChatCard;
