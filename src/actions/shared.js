import {getInitData} from "../utils/api";
import {setAuthUser} from "./authUser";
import {receiveQuestions} from "./questions";
import {receiveUsers} from "./users";
import {showLoading,hideLoading} from "react-redux-loading";


const USER = 'tylermcginnis';

export function handleInitData () {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitData()
            .then(
                ({ users, questions }) => {
                    dispatch(receiveUsers(users));
                    dispatch(receiveQuestions(questions));
                    dispatch(setAuthUser(USER));
                    dispatch(hideLoading());
                }
            )
    }
}