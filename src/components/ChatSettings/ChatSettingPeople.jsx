import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOtherUsers,
  postAddChatMember,
  putRemoveChatMember,
} from "../../store/actions/user.action";
import SelectComp from "../Utils/Select";
import "./styles/chatSettingPeople.css";
import Dialog from "../Utils/Dialog";

const ChatSettingPeople = ({ chat }) => {
  const dispatch = useDispatch();
  const [otherUsers, setOtherUsers] = useState([]);
  const [isShowAddMember, setIsShowAddMember] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [contentRemove, setContentRemove] = useState(null);
  const [selectedUserRemove, setSelectedUserRemove] = useState("");

  const otherUsersStore = useSelector((state) => state.chatReducer.otherUsers);

  const handleAddMember = () => {
    if (isShowAddMember) {
      // Submit
      if (selectedUsers.length > 0) {
        dispatch(postAddChatMember(chat?.id, selectedUsers));
      }
      setOtherUsers([]);
      setSelectedUsers([]);
      setIsShowAddMember(false);
    } else {
      // Show and get api others user
      dispatch(getOtherUsers(chat?.id));

      setIsShowAddMember(true);
    }
  };
  useEffect(() => {
    const options = [];
    otherUsersStore.map((user) => {
      options.push({
        name: user.username,
        value: user.username,
        avatar: user.avatar,
      });
    });
    setOtherUsers(options);
  }, [otherUsersStore]);
  const handleRemoveMember = () => {
    dispatch(putRemoveChatMember(chat?.id, selectedUserRemove));
    setSelectedUserRemove("");
    setIsShowDialog(false);
  };
  const onShowDialog = (userRemoved) => {
    setContentRemove(
      <div className="text-center">
        Do you want to remove{" "}
        <span style={{ fontWeight: "500" }}>{userRemoved}?</span>
      </div>
    );
    setSelectedUserRemove(userRemoved);
    setIsShowDialog(true);
  };
  const renderListPeople = () => {
    return chat?.people?.map((person, index) => {
      return (
        <div className="chatMember" key={`person_${index}`}>
          <div className="chatMember__avatar">
            <img
              className="chatMember__avatar"
              src={person.person.avatar}
              alt="person-avatar"
            />
            {person.person.username !== localStorage.getItem("username") && (
              <span
                className={`chatMember__status
              ${person.person.is_online ? "online" : ""}`}
              ></span>
            )}
          </div>
          <span className="chatMember__name">{person.person.username}</span>
          {person.person.username !== localStorage.getItem("username") ? (
            <button
              className="chatMember__remove"
              onClick={() => onShowDialog(person.person.username)}
            >
              Remove
            </button>
          ) : (
            ""
          )}
        </div>
      );
    });
  };
  return (
    <>
      <Dialog
        type={"form"}
        isShow={isShowDialog}
        content={contentRemove}
        title={"Remove Member"}
        handleHideModal={() => {
          setIsShowDialog(false);
        }}
        onSubmit={handleRemoveMember}
      />
      <div
        style={{
          display: isShowAddMember ? "block" : "none",
          marginTop: "10px",
        }}
      >
        <SelectComp
          options={otherUsers}
          value={selectedUsers}
          changeSelected={(value) => {
            setSelectedUsers(value);
          }}
        />
      </div>
      <button className="button--add-member" onClick={handleAddMember}>
        {isShowAddMember ? "Confirm" : "Add member +"}
      </button>
      {renderListPeople()}
    </>
  );
};
export default ChatSettingPeople;
