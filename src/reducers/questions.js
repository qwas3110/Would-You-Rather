import {
    RECEIVE_QUESTIONS,
    ANSWER_QUESTION
} from "../actions/questions";




export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            };
        case ANSWER_QUESTION :
            const { authUser, qid, answer } = action;
            return  {
                ...state,
                [qid] : {
                    ...state[qid],
                    [answer] : {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat(authUser)
                    }
                }
            };

        default :
            return state;
    }
}