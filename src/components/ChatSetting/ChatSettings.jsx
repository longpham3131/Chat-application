import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatDetail } from "../../store/actions/chat.action";
import Dropdown from "../Utils/Dropdown";
import ChatSettingOption from "./ChatSettingOption";
import ChatSettingPeople from "./ChatSettingPeople";
import ChatSettingPhoto from "./ChatSettingPhoto";
import ChatSettingTop from "./ChatSettingTop";

const ChatSettings = (props) => {
  const dispatch = useDispatch();
  const dataSetting = useSelector((state) => state.ChatReducer.chatDetail);
  useEffect(() => {
    console.log("111");
    dispatch(getChatDetail(49601));
  }, []);
  //   dispatch(getChatDetail(49601));

  return (
    <div style={{ padding: "10px" }}>
      <ChatSettingTop title={dataSetting?.title} />
      <Dropdown
        title={"People"}
        content={<ChatSettingPeople chat={dataSetting} />}
      />
      <Dropdown
        title={"Photos"}
        content={<ChatSettingPhoto chat={dataSetting} />}
      />
      <Dropdown
        title={"Options"}
        content={<ChatSettingOption chat={dataSetting} />}
      />
    </div>
  );
};
export default ChatSettings;
