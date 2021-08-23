import { useState } from "react";
import DefaultImage from "../../assets/img/default-image.jpg";
const MyMessage = ({ message, handleShowImage }) => {
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  // Kiểm tra tín nhắn có ảnh không
  if (message?.attachments?.length > 0) {
    if (message?.attachments[0].file.includes(".mp4")) {
      return (
        <video
          width="320"
          height="240"
          className="message-image"
          style={{ float: "right " }}
          controls
        >
          <source src={message.attachments[0].file} type="video/mp4" />
        </video>
      );
    }
    return message.attachments.map((attach, index) => {
      return (
        <img
          src={isLoadingImg ? DefaultImage : attach.file}
          alt="message-attachment"
          className="message-image"
          onClick={() => handleShowImage(attach.file)}
          onLoad={() => {
            setIsLoadingImg(false);
          }}
          style={{ float: "right ", cursor: "pointer" }}
          key={index}
        />
      );
    });
  }
  return (
    <div
      className="message"
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
