import imgDefault from "../../../src/assets/img/logo192.png";

const ChatSettingTop = ({ creds, chat }) => {
  console.log("CHAT_SETTING_PROPS", chat);
  return (
    <div className="container text-center mt-3">
      <img
        src={imgDefault}
        alt="img-chat-room"
        style={{
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          marginBottom: "10px",
        }}
      />
      <h4>{chat?.title}</h4>
    </div>
  );
};

export default ChatSettingTop;
