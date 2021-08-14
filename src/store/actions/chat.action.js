import axios from 'axios'
import {GET_CHAT_USER} from '../constants/chat.constant'

export const getChatUser = (username, password) => {
    return async (dispatch) => {
        const authObject = {'Project-ID' : 'e078c6b8-8d92-4d9b-a130-9f7c1b64406f', 'User-Name' : username, 'User-Secret': password}
        try{
            await axios.get('https://api.chatengine.io/chats', {headers: authObject});
 
            localStorage.setItem('username', username)
            localStorage.setItem('password', password)
            dispatch(getChatUserAction(''))
            window.location.reload();
            
 
         }
         catch( error) {
            dispatch(getChatUserAction('Username or password invalid'))
         }
    }
}

const getChatUserAction = (status) => {
    return { type: GET_CHAT_USER, payload: status}
}