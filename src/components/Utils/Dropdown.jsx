import { useState } from "react";
import "./styles/dropdown.css";
const Dropdown = ({ title, content }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <div className="dropdown--custom" onClick={() => setIsShow(!isShow)}>
        <h5>{title}</h5>
        <i className={`fa fa-angle-left ${isShow ? "active" : " "} `}></i>
      </div>

      <div style={{ display: isShow ? "block" : "none" }}>{content}</div>
    </>
  );
};

export default Dropdown;
