import { useState } from "react";
import "./styles/chatSettingPhoto.css";
import Dialog from "../Utils/Dialog";

const ChatSettingPhoto = ({ chat }) => {
  const [file, setFile] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
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
                className="col-4 p-0 "
                key={`file_${index}`}
                style={{ height: "100px" }}
              >
                <video style={{ width: "100%", height: "100px" }} controls>
                  <source src={item.file} type="video/mp4" />
                </video>
              </div>
            );
          }

          return (
            <div
              className="col-4 p-0"
              key={`file_${index}`}
              style={{
                backgroundImage: `url(${item.file})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100px",
                cursor: "pointer",
              }}
              onClick={() => {
                handleOpenImage(item.file);
              }}
            >
              {/* <img src={item.file} alt="message-attachment" className="w-100" /> */}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ChatSettingPhoto;
