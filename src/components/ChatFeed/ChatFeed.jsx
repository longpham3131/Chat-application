import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import Dialog from "../Utils/Dialog";
import { useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { message } from "antd";
import Loading from "../Utils/Loading";
import { IsTyping } from "react-chat-engine";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMess, getMessages } from "../../store/actions/chat.action";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, connecting } = props;
  const dispatch = useDispatch();
  const scrollDownHere = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getMessages(49601));
  }, []);
  const chat = chats && chats[activeChat];
  const messages = useSelector((state) => state.ChatReducer.messages);

  useEffect(() => {
    if (chat?.last_message?.id !== messages[messages.length - 1]?.id) {
      dispatch(getMessages(49601));
    }
  }, [chat?.last_message]);

  useEffect(() => {
    scrollDownHere.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderReceipts = (message, isMyMessage) => {
    return chat.people.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage: `url(${person?.person?.avatar})`,
            }}
          />
        )
    );
  };

  const renderMessage = () => {
    if (!messages) return null;
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage
                message={message}
                handleShowImage={(file) => {
                  setFile(file);
                  setIsShowModal(true);
                }}
              />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
                handleShowImage={(file) => {
                  setFile(file);
                  setIsShowModal(true);
                }}
              />
            )}
          </div>

          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marignLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  // renderMessage();
  // if (connecting || Object.keys(messages).length === 0) return "Loading....";
  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat?.people.map((person) => `${person?.person?.username}, `)}
        </div>
      </div>
      <Dialog
        isShow={isShowModal}
        content={file}
        handleHideModal={() => {
          setIsShowModal(false);
        }}
      />
      {connecting || Object.keys(messages).length === 0 ? (
        <Loading content={"Loading message..."} />
      ) : (
        renderMessage()
      )}
      <IsTyping />
      <div style={{ height: "100px" }} ref={scrollDownHere} />
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
