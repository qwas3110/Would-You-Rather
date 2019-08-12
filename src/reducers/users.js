import {
    RECEIVE_USERS,
    ANSWER_USER
} from "../actions/users";



export default function users (state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS :
            return {
                ...state,
                ...action.users
            };
        case ANSWER_USER :
            const { authUser, qid, answer } = action;
            return {
                ...state,
                [authUser]: {
                    ...state[authUser],
                    answers: {
                        ...state[authUser].answers,
                        [qid]: answer
                    }
                }
            };
        default :
            return state;
    }
}


