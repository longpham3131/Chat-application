import { useState } from "react";
import "./styles/filePreview.css";
const FilePreview = ({ file, handleRemoveFile }) => {
  // const [fileUpload, setFileUpload] = useState(null);

  // const onUploadFile = () => {
  //   let fileUpload = file;
  //   let reader = new FileReader();
  //   let url = reader.readAsDataURL(fileUpload);
  //   reader.onloadend = () => {
  //     setFileUpload(reader.result);
  //   };
  // };
  // onUploadFile();
  return (
    <div className="filePreview">
      <span
        className="filePreview__iconDelete"
        onClick={() => {
          handleRemoveFile(file);
          // console.log("FILE", fileUpload);
        }}
      >
        X
      </span>
      {file.type === "video/mp4" ? (
        <video
          style={{
            float: "right ",
            width: "100px",
            height: "100px",
            margin: "10px",
          }}
          controls
        >
          <source src={URL.createObjectURL(file)} type="video/mp4" />
        </video>
      ) : (
        <div
          style={{
            width: "100px",
            height: "100px",
            margin: "10px",
            backgroundImage: `url(${URL.createObjectURL(file)})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      )}
    </div>
  );
};
export default FilePreview;
