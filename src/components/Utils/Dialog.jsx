import { Modal, Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import DefaultImage from "../../assets/img/default-image.jpg";
import Loader from "react-loader-spinner";
const Dialog = ({
  type = "file",
  title = "",
  content = "",
  isShow,
  handleHideModal,
  btnSubmitName = "Confirm",
  onSubmit,
}) => {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setisLoading(true);
  }, [content]);

  const customFooter = () => {
    return (
      <div>
        <Button
          danger
          onClick={() => {
            handleHideModal();
          }}
        >
          Close
        </Button>
        <Button type="primary" onClick={onSubmit}>
          {btnSubmitName}
        </Button>
      </div>
    );
  };

  return (
    <Modal
      visible={isShow}
      title={title}
      closable={false}
      centered={true}
      footer={type === "file" ? null : customFooter()}
      onCancel={() => {
        handleHideModal();
      }}
    >
      {/* <div
        style={{
          backgroundImage: `url(${content})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "400px",
        }}
        
      ></div> */}
      {type === "file" ? (
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "28%", right: "29%" }}>
            <Loader type="Oval" color="#7554a0" height={200} width={200} />
          </div>
          <img
            src={isLoading ? DefaultImage : content}
            alt="img"
            className="w-100"
            onLoad={() => {
              setisLoading(false);
            }}
          />
        </div>
      ) : (
        content
      )}
    </Modal>
  );
};

export default Dialog;
