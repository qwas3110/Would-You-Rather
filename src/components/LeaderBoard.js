import React, {Component} from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {


    render() {

        const { users,leaderBoard } = this.props;

        return (
            <div className="text-center">
                {users !== undefined &&
                leaderBoard.map((user) =>
                    <div key={user.id}>
                        <div className="row">
                            <div className="img-col">
                                <img src={user.avatarURL} alt="profile"/>
                            </div>
                            <div >
                                <p>{user.name} ({user.id}) </p>
                                <p>{user.answerNum} answered questions</p>
                                <p>{user.questionNum} created questions</p>
                                <br />
                            </div>
                            <div className="score-col">
                                <p><strong>Score: {user.total}</strong></p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}


function mapstartToProps ({ users }) {
    const leaderBoard = Object.values(users)
        .map((user) => ({
            id: user.id,
            name: user.name,
            avatarURL: user.avatarURL,
            answerNum : Object.values(user.answers).length,
            questionNum : user.questions.length,
            total: Object.values(user.answers).length + user.questions.length        }))
        .sort((a,b) => a.total - b.total)
        .reverse()
        .slice(0,3);

    return {
        leaderBoard,
        users
    }
}




export default connect(
    mapstartToProps
)(LeaderBoard);