import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { PictureOutlined, SendOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { patchReadMessage } from "../../store/actions/chat.action";
import FilePreview from "../Utils/FilePreview";
import "./styles/messageForm.css";

const MessageForm = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [listFilePreview, setListFilePreview] = useState([]);
  // const [listFileUpload, setListFileUpload] = useState([])
  const { creds } = props;

  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);

  const handleSubmit = (event) => {
    console.log("LIST FILE", listFilePreview);
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0 || listFilePreview.length > 0) {
      sendMessage(creds, selectedChat, { text, files: listFilePreview });
    }

    setValue("");
    setListFilePreview([]);
  };
  const handleFocus = () => {
    dispatch(patchReadMessage(selectedChat, props.latestMessage));
  };
  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, selectedChat);
  };
  const onShowPreview = (event) => {
    // console.log("EVEVNT", listFilePreview, event.target.files);
    // let file = event.target.files[0];
    // let reader = new FileReader();
    // let url = reader.readAsDataURL(file);
    // const filePreview = [...listFilePreview];

    // reader.onloadend = () => {
    //   filePreview.push(reader.result);
    //   setListFilePreview(filePreview);
    // };
    const newFile = [...listFilePreview];
    newFile.push(event.target.files[0]);
    setListFilePreview(newFile);

    // sendMessage(creds, selectedChat, { files: event.target.files, text: "" });
  };
  const handleRemoveFile = (file) => {
    const newFilePreviewList = listFilePreview.filter((item) => item !== file);
    setListFilePreview(newFilePreviewList);
  };
  return (
    <form className="message-form" onSubmit={handleSubmit}>
      {/* Chỗ Load ảnh  */}
      {listFilePreview.length > 0 && (
        <div className="file-preview scrollbar-custom d-flex m-2">
          {listFilePreview.map((file, index) => (
            <FilePreview
              file={file}
              key={index}
              handleRemoveFile={(file) => handleRemoveFile(file)}
            />
          ))}
        </div>
      )}

      {/* Input nhập tin nhắn*/}
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
          onChange={onShowPreview}
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
