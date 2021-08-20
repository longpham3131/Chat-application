import { combineReducers } from 'redux'
import { chatReducer } from './chat.reducer'

const rootReducer = combineReducers({
    chatReducer,
})

export default rootReducer;