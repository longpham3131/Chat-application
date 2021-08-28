import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatDetail } from "../../store/actions/chat.action";
import Dropdown from "../Utils/Dropdown";
import ChatSettingOption from "./ChatSettingOption";
import ChatSettingPeople from "./ChatSettingPeople";
import ChatSettingPhoto from "./ChatSettingPhoto";
import ChatSettingTop from "./ChatSettingTop";
import backGround from "../../assets/img/background-purple-2.jpg";

const ChatSettings = (props) => {
  const dispatch = useDispatch();
  const dataSetting = useSelector((state) => state.chatReducer.chatDetail);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  useEffect(() => {
    dispatch(getChatDetail(selectedChat));
  }, []);
  return (
    <div
      style={{
        padding: "10px",
        backgroundImage: `url(${backGround})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="background--image-custom"
    >
      <ChatSettingTop title={dataSetting?.title} />
      <div style={{ overflowY: "scroll", maxHeight: "80vh" }}>
        <Dropdown
          title={`People (${dataSetting?.people?.length})`}
          content={<ChatSettingPeople chat={dataSetting} />}
        />
        <Dropdown
          title={`Photos (${dataSetting?.attachments?.length})`}
          content={<ChatSettingPhoto chat={dataSetting} />}
        />
        <Dropdown
          title={"Options"}
          content={<ChatSettingOption chat={dataSetting} />}
        />
      </div>
    </div>
  );
};
export default ChatSettings;
