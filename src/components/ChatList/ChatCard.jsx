import moment from "moment";
import { useDispatch } from "react-redux";
import { changeSelectedChat } from "../../store/actions/chat.action";
import "./styles/chatCard.css";
const ChatCard = ({ chat }) => {
  console.log("CHAT", chat);
  const dispatch = useDispatch();
  const onChangeChat = () => {
    dispatch(changeSelectedChat(chat?.id));
  };
  const handleText = () => {
    let text = chat?.last_message?.text;

    if (text !== "") {
      // word include key space
      // Ex: this is a word
      if (text.split(" ").length !== 0) {
        return text.split(" ").map((word, index) => {
          if (index < 5) {
            return word;
          }
          if (index === 5) {
            return "...";
          }
        });
      }
      // long word no space
      // Ex: thisisawordddddddddddd
      else {
        return text.slice(1, 40) + "...";
      }
    } else {
      console.log("NULLL");
      return "";
    }
  };
  return (
    <div className="chatCard" onClick={onChangeChat}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="chatCard__title m-0">{chat?.title}</p>
        <span>
          {chat?.last_message?.created
            ? moment(chat?.last_message?.created).fromNow()
            : moment(chat?.created).fromNow()}
        </span>
      </div>

      <div className="d-flex  align-items-center">
        <span style={{ fontWeight: "500", marginRight: "5px" }}>
          {chat?.last_message?.sender?.username}:
        </span>
        <span>{handleText()}</span>
      </div>
    </div>
  );
};
export default ChatCard;
