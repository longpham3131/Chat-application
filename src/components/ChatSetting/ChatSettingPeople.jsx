import "./styles/chatSettingPeople.css";

const ChatSettingPeople = ({ creds, chat }) => {
  const renderListPeople = () => {
    return chat.people.map((person) => {
      return (
        <div className="chatMember">
          <img
            className="chatMember__avatar"
            src={person.person.avatar}
            alt="person-avatar"
          />
          <span className="chatMember__name">{person.person.username}</span>
          <span className="chatMember__role">
            {person.person.username === chat.admin.username
              ? "Admin"
              : "Member"}
          </span>
        </div>
      );
    });
  };
  return (
    <>
      <button className="button--add-member">Add member +</button>
      {renderListPeople()}
    </>
  );
};
export default ChatSettingPeople;
