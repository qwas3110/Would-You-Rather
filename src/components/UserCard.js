import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';



class UserCard extends Component {


    render() {

        const { users, question, question_type } = this.props;

        return (
            <div>
                <div>
                    <div>
                        <img src={users[question.author].avatarURL}/>
                    </div>
                    <div>
                        <p>{users[question.author].name} asks - Would you rather</p>
                        <p><strong>{question.optionOne.text}...</strong></p>
                        <p>
                            {
                                question_type === 'unanswered' && (
                                    <NavLink to={`/questions/${question.id}`}>
                                        View Poll
                                    </NavLink>
                                )

                            }

                            {
                                question_type === 'answered' && (
                                    <NavLink to={`/results/${question.id}`}>
                                        View Answer
                                    </NavLink>
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}



function mapStateToProps (
    {users, questions} ,
    {question_id, question_type}
    ) {
    const question = questions[question_id];
    return {
        users,
        question,
        question_type
    }
}


export default connect(
    mapStateToProps
)(UserCard);