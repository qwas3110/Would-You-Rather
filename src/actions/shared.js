import {getInitData} from "../utils/api";
import {receiveQuestions} from "./questions";
import {receiveUsers} from "./users";
import {showLoading,hideLoading} from "react-redux-loading";

//answer question & user
import {answerUser} from "./users";
import {answerQuestion} from "./questions";
import {saveQuestionAnswer} from "../utils/api";


// add Question
import {addQuestion} from "./questions";
import {questionTOUser} from "./users";
import {saveQuestion} from "../utils/api";

export function handleSaveQuestion (optionOneText, optionTwoText, author) {
    return (dispatch) => {
        return saveQuestion({optionOneText, optionTwoText, author})
            .then(
                (question) => {
                    dispatch(addQuestion(question));
                    dispatch(questionTOUser(question));
                }
            )
    }
}




export function handleAnswerQuestion (authUser, qid, answer) {
    return (dispatch) => {
        dispatch(answerUser(authUser,qid,answer));
        dispatch(answerQuestion(authUser,qid,answer));

        return saveQuestionAnswer(authUser,qid,answer)
            .catch((e) => {
                console.log('Save Answer Error, ', e );
            })
    }
}



const USER = 'tylermcginnis';

export function handleInitData () {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitData()
            .then(
                ({ users, questions }) => {
                    dispatch(receiveUsers(users));
                    dispatch(receiveQuestions(questions));
                    dispatch(hideLoading());
                }
            )
    }
}