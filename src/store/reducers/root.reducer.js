import { combineReducers } from 'redux'
import { ChatReducer } from './chat.reducer'

const rootReducer = combineReducers({
    ChatReducer,
})

export default rootReducer;