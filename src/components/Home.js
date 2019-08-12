import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserCard from "./UserCard";




class Home extends Component {

    state = {
        questionType : 'unanswered'
    };

    handleUnanswered = () => {
        this.setState({
            questionType : 'unanswered'
        })
    };

    handleAnswered = () => {
        this.setState({
            questionType : 'answered'
        })
    };



    render() {

        const { authUser, users, questions } = this.props;
        const { questionType } = this.state;
        // 回答过的问题ID
        const answerID = Object.keys(users[authUser].answers);

        const answered = Object.values(questions)
                            .filter( q => answerID.includes(q.id))
                            .sort((a,b) => b.timestamp - a.timestamp);
        const unanswered = Object.values(questions)
                            .filter( q => ! answerID.includes(q.id) )
                            .sort((a,b) => b.timestamp - a.timestamp);



        return (
            <div>
                <div>
                    <ul>
                        <li>
                            {
                                questionType === 'unanswered'
                                    ? <button>Unanswered</button>
                                    : <button onClick={this.handleUnanswered}>
                                        Unanswered
                                      </button>
                            }
                        </li>
                        <li>
                            {
                                questionType === 'answered'
                                    ? <button>Answered</button>
                                    : <button onClick={this.handleAnswered}>
                                        Answered
                                      </button>
                            }
                        </li>
                    </ul>
                    {
                        questionType === 'unanswered' &&
                        unanswered.map(q => (
                            <UserCard
                                key={q.id}
                                question_type='unanswered'
                                question_id={q.id}
                            />
                        ))
                    }

                    {
                        questionType === 'answered' &&
                        answered.map(q => (
                            <UserCard
                                key={q.id}
                                question_type='answered'
                                question_id={q.id}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }

}


function mapStateToProps ({ authUser, users, questions }) {
    return {
        authUser,
        users,
        questions,
    }
}




export default connect(
    mapStateToProps
)(Home);