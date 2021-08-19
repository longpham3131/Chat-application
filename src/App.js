import { ChatEngine } from "react-chat-engine";
import ChatFeed from './components/ChatFeed/ChatFeed'
import "./App.css";
import LoginForm from "./components/LoginForm";
import ChatSettingTop from "./components/ChatSetting/ChatSettingTop";
import ChatSettingOption from "./components/ChatSetting/ChatSettingOption";
import Dropdown from "./components/Utils/Dropdown";
import ChatSettingPeople from "./components/ChatSetting/ChatSettingPeople";
import ChatSettingPhoto from "./components/ChatSetting/ChatSettingPhoto";
import ChatSettings from "./components/ChatSetting/ChatSettings";


const App = () => {
    if (!localStorage.getItem('username')) return <LoginForm />

    return (
        <ChatEngine
            height="100vh"
            projectID="e078c6b8-8d92-4d9b-a130-9f7c1b64406f"
            userName={localStorage.getItem('username')}
            userSecret={localStorage.getItem('password')}
            // render custome component

            renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
            renderChatSettings={(chatAppProps) => <ChatSettings {...chatAppProps}/>}
        ></ChatEngine>

    );
};

export default App;
