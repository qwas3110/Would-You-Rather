import {combineReducers} from "redux";
import authUser from "./authUser";
import users from "./users";
import questions from "./questions";
import {loadingBarReducer} from "react-redux-loading";


export default combineReducers({
    authUser,
    users,
    questions,
    loadingBar: loadingBarReducer
})

