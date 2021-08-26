import { useState } from "react";
import DefaultImage from "../../assets/img/default-image.jpg";
const MyMessage = ({ message, handleShowImage }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  // Kiểm tra tín nhắn có ảnh không
  if (message?.attachments?.length > 0) {
    return message.attachments.map((attach, index) => {
      if (attach.file.includes(".mp4")) {
        return (
          <video
            width="320"
            height="240"
            className="message-image"
            style={{ float: "right " }}
            controls
          >
            <source src={attach.file} type="video/mp4" />
          </video>
        );
      }
      return (
        <img
          src={isLoadingImg ? DefaultImage : attach.file}
          alt="message-attachment"
          className="message-image"
          onClick={() => handleShowImage(attach.file)}
          onLoad={() => {
            setIsLoadingImg(false);
          }}
          style={{
            float: "right ",
            cursor: "pointer",
            backgroundColor: "#c3c3c3",
          }}
          key={index}
        />
      );
    });
  }
  return (
    <div
      className="message-chat"
      style={{
        float: "right",
        marginRight: "18px",
        color: "white",
        backgroundColor: "#3b2a50",
      }}
    >
      {message.text.includes("https") ? (
        <a
          href={message.text}
          target="_blank"
          style={{ color: "white" }}
          rel="noreferrer"
        >
          {message.text}{" "}
        </a>
      ) : (
        message.text
      )}
    </div>
  );
};

export default MyMessage;
