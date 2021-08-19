import { Modal } from "antd";

const Dialog = ({
  type = "file",
  title = "",
  content = "",
  isShow,
  handleHideModal,
}) => {
  return (
    <Modal
      visible={isShow}
      title={title}
      closable={false}
      footer={null}
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
      {type === "file" ? <img src={content} alt="img" className="w-100" /> : ""}
    </Modal>
  );
};

export default Dialog;
