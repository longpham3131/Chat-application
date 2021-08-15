import "./styles/chatSettingOption.css";

const ChatSettingOption = ({ creds, chat }) => {
  const handleSignOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");

    window.location.reload();
  };
  return (
    <div className="content__options">
      <div>Leave room chat</div>
      <div onClick={handleSignOut}>Sign out</div>
    </div>
  );
};

export default ChatSettingOption;
