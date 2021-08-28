import { useState } from "react";
import { createUser, getChatUser } from "../store/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Form, Input, Button, Checkbox } from "antd";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useEffect } from "react";

const { TabPane } = Tabs;

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formRegister] = Form.useForm();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameRgt, setUsernameRgt] = useState("");
  const [passwordRgt, setPasswordRgt] = useState("");
  const [fnameRgt, setFnameRgt] = useState("");
  const [lnameRgt, setLnameRgt] = useState("");
  const [avatarRgt, setAvatarRgt] = useState(null);

  const [loading, setLoading] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);
  const [messageErr, setMessageErr] = useState("");

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const getChatUserStatus = useSelector((state) => state.userReducer.chatUser);
  const createUserStore = useSelector((state) => state.userReducer.createUser);

  useEffect(() => {
    if (createUserStore.status === 201) {
      NotificationManager.success("Success", "Create user");
      formRegister.resetFields();
      setAvatarRgt(null);
    } else if (createUserStore.status === 400) {
      NotificationManager.error(createUserStore.data.message, "Create user");
    }
  }, [createUserStore]);

  const handleSubmit = (e) => {
    if (!avatarRgt) {
      setMessageErr("Please choose your avatar !");
      return;
    }
    //Login
    if (selectedTab === "login") {
      dispatch(getChatUser(username, password));
    }
    // Register
    else {
      let formData = new FormData();
      formData.append("username", usernameRgt);
      formData.append("first_name", usernameRgt);
      formData.append("last_name", usernameRgt);
      formData.append("secret", passwordRgt);
      formData.append("avatar", avatarRgt);
      dispatch(createUser(formData));
    }
  };

  function callback(key) {
    setSelectedTab(key);
  }

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    setMessageErr("");
    if (!isJpgOrPng) {
      setMessageErr("You can only upload JPG/PNG file!");
      // message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      setMessageErr("Image must smaller than 2MB!");
      // message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    console.log("INFO", info);

    setAvatarRgt(info.file.originFileObj);
    // setAvatarRgt(null);
    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (avatarRgt) => {
    //     setAvatarRgt(avatarRgt);
    //     setLoading(false);
    //   });
    // }
    // if (info.file.status === "error") {
    //   setLoading(false);
    //   setMessageErr("Upload Image Fail !");
    // }
  };

  return (
    <div className="wrapper">
      {/* <h1 className="title-custom">Chat Application</h1> */}
      <div className="wrapper__loginForm">
        <NotificationContainer />
        <Tabs defaultActiveKey="login" onChange={callback} size={"large"}>
          <TabPane tab="Login" key="login">
            <Form
              name="login"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 20 }}
              initialValues={{ remember: true }}
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <span
                className="error"
                style={{
                  display: getChatUserStatus !== "" ? "block" : "none",
                }}
              >
                {getChatUserStatus}
              </span>
              <Form.Item wrapperCol={{ offset: 20, span: 20 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Register" key="register">
            <Form
              name="register"
              form={formRegister}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 15 }}
              labelAlign={"left"}
              onFinish={handleSubmit}
            >
              <Form.Item label="Avatar" name="avatarRgt">
                <Upload
                  name="avatarRgt"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {avatarRgt ? (
                    // <img
                    //   src={URL.createObjectURL(avatarRgt)}
                    //   alt="avatar"
                    //   style={{ width: "100%" }}
                    // />
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: `url(${URL.createObjectURL(
                          avatarRgt
                        )})`,
                      }}
                    ></div>
                  ) : (
                    uploadButton
                  )}
                </Upload>
                <span className="error">{messageErr}</span>
              </Form.Item>
              <Form.Item
                label="Username"
                name="usernameRgt"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input onChange={(e) => setUsernameRgt(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="passwordRgt"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                hasFeedback
              >
                <Input.Password
                  onChange={(e) => setPasswordRgt(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("passwordRgt") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item label="First name" name="fname">
                <Input onChange={(e) => setFnameRgt(e.target.value)} />
              </Form.Item>

              <Form.Item label="Last name" name="lname">
                <Input onChange={(e) => setLnameRgt(e.target.value)} />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 20, span: 20 }}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginForm;
