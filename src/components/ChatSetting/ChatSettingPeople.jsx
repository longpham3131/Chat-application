import "./styles/chatSettingPeople.css";

const ChatSettingPeople = ({ chat }) => {
  const renderListPeople = () => {
    return chat?.people?.map((person, index) => {
      return (
        <div className="chatMember" key={`person_${index}`}>
          <img
            className="chatMember__avatar"
            src={person.person.avatar}
            alt="person-avatar"
          />
          <span className="chatMember__name">{person.person.username}</span>
          <span
            className="chatMember__status"
            style={{
              display:
                person.person.username === localStorage.getItem("username")
                  ? "none"
                  : "block",
              color: person.person.is_online ? "green" : "gray",
              fontWeight: "500",
            }}
          >
            {person.person.is_online ? "Online" : "Offline"}
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
