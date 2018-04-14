import { combineReducers } from "redux"
import userReducer from "./userReducer"
import getUserSearchHistory from "./getHistoryReducer"
import search from "./searchReducer"
import result from "./resultReducer"
import follow from "./followReducers"
import event from "./eventReducer"

const reducer = combineReducers({
  user: userReducer,
  searchHistory: getUserSearchHistory,
  search: search,
  result: result,
  follow: follow,
  event: event
})

export default reducer