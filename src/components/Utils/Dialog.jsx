import { Modal, Button } from "antd";

const Dialog = ({
  type = "file",
  title = "",
  content = "",
  isShow,
  handleHideModal,
  btnSubmitName = "Confirm",
  onSubmit,
}) => {
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
        <img src={content} alt="img" className="w-100" />
      ) : (
        content
      )}
    </Modal>
  );
};

export default Dialog;
