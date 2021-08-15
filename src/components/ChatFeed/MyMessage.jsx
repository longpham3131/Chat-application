const MyMessage = ({ message }) => {
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
    return (
      <img
        src={message.attachments[0].file}
        alt="message-attachment"
        className="message-image"
        style={{ float: "right " }}
      />
    );
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
      {message.text}
    </div>
  );
};

export default MyMessage;
