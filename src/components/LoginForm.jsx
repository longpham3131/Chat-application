import { useState } from "react";
import { getChatUser } from "../store/actions/user.action";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const getChatUserStatus = useSelector((state) => state.chatReducer.chatUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getChatUser(username, password));
  };

  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
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
              style={{ display: getChatUserStatus !== "" ? "block" : "none" }}
            >
              {getChatUserStatus}
            </h2>
            <button type="submit" className="button">
              <span>Start Chatting</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
