import React, {Component} from 'react';
import { connect } from 'react-redux';
import {handleSaveQuestion} from "../actions/shared";
import { withRouter } from 'react-router-dom';

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {authUser, handleSaveQuestion} = this.props;
        const one = this.state.optionOne;
        const two = this.state.optionTwo;
        handleSaveQuestion(one,two, authUser)
        this.setState({
            optionOne: '',
            optionTwo: ''
        });
        this.props.history.push('/');

    };


    render() {

        const {authUser, questions} = this.props;

        return (
            <div>

                <div >
                    <h3>
                        <small>Add New Question</small>
                    </h3>
                    <p><small>Complete the Question:</small></p>
                    <p><small>Would you rather...</small></p>
                    <br />

                    <input type="text"
                           id='optionOne'
                           placeholder="Enter option one text here"
                           value={this.state.optionOne}
                           onChange={this.handleChange}
                    />

                    <span>Or</span>

                    <input type="text"
                           id='optionTwo'
                           placeholder="Enter option two text here"
                           value={this.state.optionTwo}
                           onChange={this.handleChange}
                    />

                    <button onClick={this.handleSubmit}>
                        Add Question
                    </button>
                </div>
            </div>
        );
    }

}

function mapStateToProps ({ authUser, questions }) {
    return {
        authUser,
        questions
    }
}


export default connect(
    mapStateToProps,
    {handleSaveQuestion}
)(NewQuestion);