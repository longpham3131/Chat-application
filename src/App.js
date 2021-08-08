import { ChatEngine } from "react-chat-engine";
import ChatFeed from './components/ChatFeed'
import "./App.css";

const App = () => {
    return (
        <ChatEngine
            height="100vh"
            projectID="e078c6b8-8d92-4d9b-a130-9f7c1b64406f"
            userName="Long"
            userSecret="123123"
            // render custome component

            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
        ></ChatEngine>
    );
};

export default App;
