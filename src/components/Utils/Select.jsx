import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;

const SelectComp = ({ options, changeSelected, value }) => {
  const handleChange = (value) => {
    changeSelected(value);
  };

  const children = () => {
    return options.map((item, index) => (
      <Option key={index} value={item.value}>
        <div className="d-flex align-items-center">
          <img
            src={item?.avatar}
            alt="user-avatar"
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <span>{item.name}</span>
        </div>
      </Option>
    ));
  };
  return (
    <Select
      mode="multiple"
      allowClear
      value={value}
      style={{ width: "100%" }}
      placeholder="Choose User"
      onChange={handleChange}
    >
      {children()}
    </Select>
  );
};

export default SelectComp;
