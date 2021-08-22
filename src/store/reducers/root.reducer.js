import { combineReducers } from "redux";
import { chatReducer } from "./chat.reducer";
import { userReducer } from "./user.reducer";

const rootReducer = combineReducers({
  userReducer,
  chatReducer,
});

export default rootReducer;
