export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ANSWER_USER = 'ANSWER_USER';
export const QUESTION_USER = 'QUESTION_USER';




export function questionTOUser ({ id, author }) {
    return {
        type: QUESTION_USER,
        id,
        author
    }
}



export function answerUser (authUser, qid, answer) {
    return {
        type: ANSWER_USER,
        authUser,
        qid,
        answer
    }
}


export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}