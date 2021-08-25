import { useState } from "react";
import "./styles/chatSettingPhoto.css";
import DefaultImage from "../../assets/img/default-image.jpg";
import Dialog from "../Utils/Dialog";

const ChatSettingPhoto = ({ chat }) => {
  const [file, setFile] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoadingImg, setIsLoadingImg] = useState(true);
  // console.log("CHAT PHOTOS", chat);

  const handleOpenImage = (file) => {
    setFile(file);
    setIsShowModal(true);
  };

  return (
    <>
      <Dialog
        content={file}
        isShow={isShowModal}
        handleHideModal={() => {
          setIsShowModal(false);
        }}
      />
      <div
        className="row m-0"
        style={{
          overflowY: "scroll",
          height: "200px",
          maxHeight: "200px",
          paddingBottom: "10px",
          paddingTop: "10px",
        }}
      >
        {chat?.attachments?.map((item, index) => {
          if (item.file.includes(".mp4")) {
            return (
              <div
                key={`file_${index}`}
                style={{
                  height: "100px",
                  width: "30%",
                  margin: "3px",
                  flex: "0 0 auto",
                  padding: "0",
                }}
              >
                <video style={{ width: "100%", height: "100px" }} controls>
                  <source src={item.file} type="video/mp4" />
                </video>
              </div>
            );
          }

          return (
            <div
              key={`file_${index}`}
              style={{
                backgroundImage: `url(${
                  isLoadingImg ? DefaultImage : item.file
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100px",
                cursor: "pointer",
                width: "30%",
                margin: "3px",
                flex: "0 0 auto",
                backgroundColor: "#c3c3c3",
              }}
              onClick={() => {
                handleOpenImage(item.file);
              }}
            >
              <img
                src={item.file}
                alt="message-attachment"
                className="d-none"
                onLoad={() => setIsLoadingImg(false)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ChatSettingPhoto;
