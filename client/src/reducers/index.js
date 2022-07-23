import { combineReducers } from "redux"
import authReducer from "./authReducer"
import errorReducer from "./errorReducer"
import profileReducer from "./profileReducer"
import postReducer from "./postReducer"
import adReducer from "./adReducer"
import adminReducer from "./adminReducer"
import commentReducer from "./commentReducer"
import instructorReducer from "./instructorReducer"

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  ads: adReducer,
  admin: adminReducer,
  comments: commentReducer,
  instructor: instructorReducer,
})
