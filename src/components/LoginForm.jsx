import { useState } from "react"
import axios from 'axios'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = {'Project-ID' : 'e078c6b8-8d92-4d9b-a130-9f7c1b64406f', 'User-Name' : username, 'User-Secret': password}

        try{
           await axios.get('https://api.chatengine.io/chats', {headers: authObject});

           localStorage.setItem('username', username)
           localStorage.setItem('password', password)

           window.location.reload();

        }
        catch( error) {
            setError('Username or password invalid')
        }
        //username 
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="input" placeholder="Username" value={username}  onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" className="input" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
                    <div align="center">
                        <h2 className="error" style={{display: error != '' ? 'block' : 'none'}}>{error}</h2>
                        <button type="submit" className="button">
                            <span>Start Chatting</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginForm;