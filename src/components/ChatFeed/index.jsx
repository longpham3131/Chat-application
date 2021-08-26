import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";
import Dialog from "../Utils/Dialog";
import { useEffect, useRef, useState } from "react";
import Loading from "../Utils/Loading";
import { IsTyping } from "react-chat-engine";
import { useDispatch, useSelector } from "react-redux";
import { getLatestMess, getMessages } from "../../store/actions/chat.action";
import DefaultAvatar from "../../assets/img/default-avatar.jpg";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, connecting } = props;
  const dispatch = useDispatch();
  const scrollDownHere = useRef(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(true);
  const selectedChat = useSelector((state) => state.chatReducer.selectedChat);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const [numberMessage, setNumberMessage] = useState(10);

  const chat = chats && chats[selectedChat];
  const loadingMessage = useSelector(
    (state) => state.chatReducer.loadingMessage
  );
  // const messages = useSelector((state) => state.chatReducer.messages);
  const messages = useSelector((state) => state.chatReducer.latestMessage);

  useEffect(() => {
    if (chat?.last_message?.id !== messages[messages.length - 1]?.id) {
      dispatch(getLatestMess(selectedChat, numberMessage));
    }
    if (isScrollTop) {
      setIsScrollTop(false);
    }
  }, [chat?.last_message]);

  useEffect(() => {
    if (!isScrollTop) {
      scrollDownHere.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const renderReadReceipts = (message, isMyMessage) =>
    chat?.people?.map(
      (person, index) =>
        person.last_read === message.id &&
        person.person.username !== localStorage.getItem("username") && (
          <img
            key={`read_${index}`}
            className="read-receipt"
            src={isLoadingAvatar ? DefaultAvatar : person.person.avatar}
            alt="avatar-receipt"
            onLoad={() => {
              setIsLoadingAvatar(false);
            }}
            style={{
              float: isMyMessage ? "right" : "left",
            }}
          />
        )
    );

  const renderMessage = () => {
    if (messages.length === 0 && !loadingMessage)
      return <div className="text-center">No message</div>;

    return messages.map((message, index) => {
      const lastMessageKey = index === 0 ? null : messages[index - 1];
      const isMyMessage = userName === message.sender.username;

      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div
            className="message-block"
            id={index === 0 ? "messHeightest" : ""}
          >
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

  const handleScrollTopChatFeed = (event) => {
    const messHeightest = document.getElementById("messHeightest");

    if (messHeightest?.getBoundingClientRect().top === 106) {
      // console.log(
      //   "CALL API MESS",
      //   messHeightest.getBoundingClientRect().top,
      //   numberMessage
      // );
      setIsScrollTop(true);
      dispatch(getLatestMess(selectedChat, numberMessage));
      setNumberMessage(numberMessage + 10);
    }
  };

  return (
    <div
      className="chat-feed"
      onScroll={(e) => {
        handleScrollTopChatFeed(e);
      }}
    >
      <div className="chat-title-container">
        <div className="chat-title">{chat?.title}</div>
        <div className="chat-subtitle">
          {chat?.people.map((person) => `${person?.person?.username}, `)}
        </div>
      </div>
      {connecting || loadingMessage ? (
        <Loading content={"Loading message..."} />
      ) : (
        ""
      )}
      {/* <Loading content={"Loading message..."} /> */}
      <Dialog
        isShow={isShowModal}
        content={file}
        handleHideDialog={() => {
          setIsShowModal(false);
        }}
      />

      {renderMessage()}
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
