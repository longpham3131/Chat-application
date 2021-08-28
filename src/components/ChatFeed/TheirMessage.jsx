import DefaultImage from "../../assets/img/default-image.jpg";
import DefaultAvatar from "../../assets/img/default-avatar.jpg";
import { useState } from "react";
const TheirMessage = ({ lastMessage, message, handleShowImage }) => {
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const [isLoadingImage, setIsLoadingImage] = useState(true);
  const isFirtstMessageByUser =
    !lastMessage || lastMessage.sender.username !== message.sender.username;

  const handleTypeOfMessage = () => {
    if (message?.attachments?.length > 0) {
      //Video
      return (
        <div className="message-block">
          {message.attachments.map((item, index) => {
            if (item.file.includes(".mp4")) {
              return (
                <video
                  width="320"
                  height="240"
                  className="message-image"
                  style={{
                    float: "left ",
                    marginLeft: isFirtstMessageByUser ? "4px" : "48px",
                  }}
                  controls
                >
                  <source src={item.file} type="video/mp4" />
                </video>
              );
            }
            return (
              <img
                src={isLoadingImage ? DefaultImage : item.file}
                alt="message-attachment"
                className="message-image"
                onClick={() => handleShowImage(item.file)}
                style={{
                  marginLeft: isFirtstMessageByUser ? "4px" : "48px",
                  float: "left",
                  cursor: "pointer",
                  backgroundColor: "#c3c3c3",
                }}
                onLoad={() => {
                  setIsLoadingImage(false);
                }}
              />
            );
          })}
        </div>
      );
    } else {
      //Link
      if (message.text.includes("https")) {
        return (
          <div
            className="message-chat their-message"
            style={{
              float: "left",
              backgroundColor: "#CABCDC",
              marginLeft: isFirtstMessageByUser ? "4px" : "48px",
            }}
          >
            <a href={message.text} target="_blank" rel="noreferrer">
              {message.text}{" "}
            </a>
          </div>
        );
      }
      //text
      return (
        <div
          className="message-chat their-message"
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
        <img
          className="message-avatar"
          src={isLoadingAvatar ? DefaultAvatar : message?.sender?.avatar}
          style={{
            backgroundColor: "#c3c3c3",
          }}
          alt="avatar-sender"
          onLoad={() => {
            setIsLoadingAvatar(false);
          }}
        />
      )}
      <div style={{ maxWidth: "60%" }}>
        <p
          style={{
            marginBottom: "0",
            paddingLeft: "5px",
            color: "white",
            fontWeight: "500",
          }}
        >
          {message?.sender?.username}
        </p>
        {handleTypeOfMessage()}
      </div>
    </div>
  );
};

export default TheirMessage;
