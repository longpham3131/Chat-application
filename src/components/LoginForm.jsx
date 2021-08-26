import { useState } from "react";
import { getChatUser } from "../store/actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Form, Input, Button, Checkbox } from "antd";

const { TabPane } = Tabs;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const getChatUserStatus = useSelector((state) => state.chatReducer.chatUser);

  const handleSubmit = (e) => {
    // console.log("SUBMIT");
    // e.preventDefault();
    dispatch(getChatUser(username, password));
  };

  function callback(key) {
    setSelectedTab(key);
  }

  return (
    <div className="wrapper">
      {/* <h1 className="title-custom">Chat Application</h1> */}
      <div style={{ width: "500px" }}>
        <Tabs defaultActiveKey="1" onChange={callback} size={"large"}>
          <TabPane tab="Login" key="1">
            <Form
              name="basic"
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

              <Form.Item wrapperCol={{ offset: 20, span: 20 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
            {/* <div className="form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div align="center">
                <h2
                  className="error"
                  style={{
                    display: getChatUserStatus !== "" ? "block" : "none",
                  }}
                >
                  {getChatUserStatus}
                </h2>
                <button type="submit" className="button">
                  <span>Start Chatting</span>
                </button>
              </div>
            </form>
          </div> */}
          </TabPane>
          <TabPane tab="Register" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginForm;
