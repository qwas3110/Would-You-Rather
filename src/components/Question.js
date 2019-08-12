import React, {Component} from 'react';
import { connect } from 'react-redux';
import {handleAnswerQuestion} from "../actions/shared";
import { withRouter } from 'react-router-dom';
class Question extends Component {

    state = {
        value : ''
    };

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {authUser, id, handleAnswerQuestion } = this.props;

        if (this.state.value !== '') {
            handleAnswerQuestion(authUser,id,this.state.value);
            this.props.history.push(`/results/${id}`)
        }


    }



    render() {

        const { question, users } = this.props;



        return (
            <div>
                <p>Would you rather?</p>
                <div>
                    <img src={users[question.author].avatarURL}/>
                    <h3>
                        <small>{users[question.author].name} asks:</small>
                    </h3>
                </div>
                {
                    question && (
                        <form>
                            <input
                                type="radio"
                                name='answer'
                                value='optionOne'
                                onChange={this.handleChange}
                            />
                            {question.optionOne.text}
                            <br/>
                            <span>Or</span>
                            <input
                                type='radio'
                                name='answer'
                                value='optionTwo'
                                onChange={this.handleChange}
                            />
                            {question.optionTwo.text}
                            <button onClick={this.handleSubmit}>
                                Submit
                            </button>
                            <br/>
                        </form>
                    )
                }
            </div>
        );
    }

}


function mapStartToProps ({ authUser, questions,users }, props ) {
    const {id} = props.match.params;
    const question = questions[id];

    return {
        id,
        question,
        authUser,
        users,
    }

}

export default withRouter(
    connect(
        mapStartToProps,
        {handleAnswerQuestion}
    )(Question)
)