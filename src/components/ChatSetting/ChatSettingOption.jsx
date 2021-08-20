import { useDispatch } from "react-redux";
import { putRemoveChatMember } from "../../store/actions/chat.action";
import "./styles/chatSettingOption.css";

const ChatSettingOption = ({ creds, chat }) => {
  const dispatch = useDispatch();
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.reload();
  };
  const handleLeaveChat = () => {
    const username = localStorage.getItem("username");
    dispatch(putRemoveChatMember(chat?.id, username));
  };
  return (
    <div className="content__options">
      <div onClick={handleLeaveChat}>Leave room chat</div>
      <div onClick={handleSignOut}>Sign out</div>
    </div>
  );
};

export default ChatSettingOption;
