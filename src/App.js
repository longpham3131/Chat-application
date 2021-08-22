import { ChatEngine } from "react-chat-engine";
import "./App.css";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import ChatSettings from "./components/ChatSettings/";
import ChatList from "./components/ChatList";

const App = () => {
  if (!localStorage.getItem("username")) return <LoginForm />;

  return (
    <ChatEngine
      height="100vh"
      projectID="e078c6b8-8d92-4d9b-a130-9f7c1b64406f"
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      // render custome component

      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      renderChatSettings={(chatAppProps) => <ChatSettings {...chatAppProps} />}
      renderChatList={(chatAppProps) => <ChatList {...chatAppProps} />}
    ></ChatEngine>
  );
};

export default App;
