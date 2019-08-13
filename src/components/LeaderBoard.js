import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {
    Segment,
    Label,
    Grid,
    Image,
    Header,
    Divider,
    Container
} from "semantic-ui-react";

const trophyColor = ['yellow', 'grey', 'orange'];

class LeaderBoard extends Component {


    render() {

        const { leaderBoard } = this.props;

        return (
                <Container>
                    {leaderBoard.map((user, idx) => (
                        <Segment.Group key={user.id}>
                            <Label corner="left" icon="trophy" color={trophyColor[idx]} />
                            <Grid divided padded>
                                <Grid.Row columns={3}>
                                    <Grid.Column verticalAlign="middle">
                                        <Image src={user.avatarURL} />
                                    </Grid.Column>

                                    <Grid.Column
                                        textAlign="center"
                                        style={{
                                            lineHeight: 10
                                        }}
                                        >
                                        <Header as="h3" textAlign="center">
                                            {user.name}
                                        </Header>
                                        <div>
                                            <span><b>Answered questions:</b></span>
                                            <Label circular color="red" size="small">
                                                {user.answerNum}
                                            </Label>
                                        </div>
                                        <div>
                                            <span><b>Created questions:</b></span>
                                            <Label circular color="red" size="small">
                                                {user.questionNum}
                                            </Label>
                                        </div>
                                    </Grid.Column>

                                    <Grid.Column
                                        textAlign="center"
                                        style={{
                                            maxWidth: '100%'
                                        }}
                                        >
                                        <Segment.Group>
                                            <Header as="h5" block attached="top" content="Score" />
                                            <Segment>
                                                <Label circular color="red" size="big">
                                                    {user.total}
                                                </Label>
                                            </Segment>
                                        </Segment.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment.Group>
                    ))}
                </Container>
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
        leaderBoard
    }
}




export default connect(
    mapstartToProps
)(LeaderBoard);