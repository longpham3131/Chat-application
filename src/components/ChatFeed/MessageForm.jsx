import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { patchReadMessage } from "../../store/actions/chat.action";

const MessageForm = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const { chatId, creds } = props;

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) sendMessage(creds, chatId, { text });

    setValue("");
  };
  const handleFocus = () => {
    dispatch(patchReadMessage(49601, props.latestMessage));
  };
  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };
  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="...Send a message"
        onFocus={handleFocus}
        onChange={handleChange}
        onSubmit={handleSubmit}
        value={value}
      />

      <label
        htmlFor="upload-button"
        style={{ float: "right", lineHeight: "8px" }}
      >
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>

        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleUpload}
        />

        <button
          type="submit"
          className="send-button"
          style={{ transform: "rotate(90deg)" }}
        >
          <SendOutlined className="send-icon" />
        </button>
      </label>
    </form>
  );
};

export default MessageForm;
