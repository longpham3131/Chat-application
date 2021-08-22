import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import Dialog from "../Utils/Dialog";
import { useEffect, useRef, useState } from "react";
import Loading from "../Utils/Loading";
import { IsTyping } from "react-chat-engine";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../store/actions/chat.action";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, connecting } = props;
  const dispatch = useDispatch();
  const scrollDownHere = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);

  const chat = chats && chats[selectedChat];
  const messages = useSelector((state) => state.chatReducer.messages);

  useEffect(() => {
    if (chat?.last_message?.id !== messages[messages.length - 1]?.id) {
      dispatch(getMessages(selectedChat));
    }
  }, [chat?.last_message]);

  useEffect(() => {
    scrollDownHere.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderReadReceipts = (message, isMyMessage) =>
    chat?.people?.map(
      (person, index) =>
        person.last_read === message.id && (
          <div
            key={`read_${index}`}
            className="read-receipt"
            style={{
              float: isMyMessage ? "right" : "left",
              backgroundImage:
                person.person.avatar && `url(${person.person.avatar})`,
            }}
          />
        )
    );

  const renderMessage = () => {
    if (messages.data.length === 0)
      return <div className="text-center">No message</div>;

    return messages.data.map((message, index) => {
      const lastMessageKey = index === 0 ? null : messages[index - 1];
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
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

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
      {connecting || messages.isCompleted !== true ? (
        <Loading content={"Loading message..."} />
      ) : (
        renderMessage()
      )}
      <IsTyping />
      <div style={{ height: "100px" }} ref={scrollDownHere} />
      <div className="message-form-container">
        <MessageForm
          {...props}
          chatId={activeChat}
          latestMessage={chat?.last_message?.id}
        />
      </div>
    </div>
  );
};

export default ChatFeed;
