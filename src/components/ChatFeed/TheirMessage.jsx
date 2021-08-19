const TheirMessage = ({ lastMessage, message, handleShowImage }) => {
  const isFirtstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;

  const handleTypeOfMessage = () => {
    if (message?.attachments?.length > 0) {
      //Video
      if (message?.attachments[0].file.includes(".mp4")) {
        return (
          <video
            width="320"
            height="240"
            className="message-image"
            style={{
              float: "right ",
              marginLeft: isFirtstMessageByUser ? "4px" : "48px",
            }}
            controls
          >
            <source src={message.attachments[0].file} type="video/mp4" />
          </video>
        );
      }
      //Image
      return (
        <img
          src={message.attachments[0].file}
          alt="message-attachment"
          className="message-image"
          onClick={() => handleShowImage(message.attachments[0].file)}
          style={{
            marginLeft: isFirtstMessageByUser ? "4px" : "48px",
            cursor: "pointer",
          }}
        />
      );
    } else {
      //Link
      if (message.text.includes("https")) {
        return (
          <div
            className="message"
            style={{
              float: "left",
              backgroundColor: "#CABCDC",
              marginLeft: isFirtstMessageByUser ? "4px" : "48px",
            }}
          >
            <a href={message.text} target="_blank">
              {message.text}{" "}
            </a>
          </div>
        );
      }
      //text
      return (
        <div
          className="message"
          style={{
            float: "left",
            backgroundColor: "#CABCDC",
            marginLeft: isFirtstMessageByUser ? "4px" : "48px",
          }}
        >
          {message.text}
        </div>
      );
    }
  };
  return (
    <div className="message-row">
      {isFirtstMessageByUser && (
        <div
          className="message-avatar"
          style={{ backgroundImage: `url(${message?.sender?.avatar})` }}
        />
      )}

      {handleTypeOfMessage()}
    </div>
  );
};

export default TheirMessage;
