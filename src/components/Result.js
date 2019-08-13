import React, {Component} from 'react';
import { connect } from 'react-redux';
import NoMatch from "./NoMatch";




class Result extends Component {


    render() {

        const { question, users, author, authUser,id } = this.props


        let oneVotes = 0;
        let twoVotes = 0;
        let onePercentage = 0;
        let twoPercentage = 0;
        let total = 0;
        let authUserAnswer = '';

        if(question !== undefined){
            oneVotes = question.optionOne.votes.length
            twoVotes = question.optionTwo.votes.length
            total = oneVotes + twoVotes;
            onePercentage = ( oneVotes / total ) * 100
            twoPercentage = ( twoVotes / total ) * 100
            authUserAnswer = users[authUser].answers[id]
        } else {
            return <NoMatch/>
        }


        return (
            <div>
                {question &&
                <div>
                    <img src={author.avatarURL}/>
                    <h3>
                        <small>{author.name} asks:</small>
                    </h3>
                    <p>Results</p>
                    <div>
                        <p>Would you rather {question.optionOne.text}</p>
                        <p>{oneVotes} out of {total} votes - {onePercentage.toFixed(1)}%</p>
                        {authUserAnswer === 'optionOne' && <small>Your answer</small>}
                    </div>
                    <div>
                        <p>Would you rather {question.optionTwo.text}</p>
                        <p>{twoVotes} out of {total} votes - {twoPercentage.toFixed(1)}%</p>
                        {authUserAnswer === 'optionTwo' && <small>Your answer</small>}
                    </div>
                </div>}
            </div>
        );
    }

}



function mapStateToProps ({ authUser, questions, users, }, props) {
    const {id} = props.match.params;
    const question = questions[id];
    return {
        authUser,
        question,
        users,
        author:users[questions[id].author],
        id
    }
}


export default connect(
    mapStateToProps
)(Result);