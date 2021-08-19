import axios from 'axios'
import {GET_CHAT_USER, GET_CHAT_DETAIL} from '../constants/chat.constant'

// Get chat user
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

//Get chat detail

export const getChatDetail = (chatId = 49601) => {
    return async (dispatch) => {
        const username = localStorage.getItem('username')
        const password = localStorage.getItem('password')
        const authObject = {'Project-ID' : 'e078c6b8-8d92-4d9b-a130-9f7c1b64406f', 'User-Name' : username, 'User-Secret': password}
        try{
            const data = await axios.get(`https://api.chatengine.io/chats/${chatId}/`, {headers: authObject});
 
        //    console.log("DATA", data)
           dispatch(getChatDetailAction(data.data))
 
         }
         catch( error) {
            console.log("ERR_CHAT_DETAIL", error)
         }
    }
}
const getChatDetailAction = (data) => {
    return { type: GET_CHAT_DETAIL, payload: data}
}
