import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserCard from "./UserCard";
import {
    Button,
    Container,
    Grid,
    Icon,
    Segment
} from "semantic-ui-react";


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
            <Container>
                <Grid
                    textAlign="center"
                    style={{ height: '100%' }}
                    verticalAlign="middle"
                    padded
                >
                    <Grid.Column style={{ maxWidth: 550 }}>
                        <Grid.Row>
                            <Button.Group
                                attached="top"
                            >
                                <Button
                                    animated='vertical'
                                    onClick={this.handleUnanswered}
                                >
                                    <Button.Content hidden>unanswered</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='question' />
                                    </Button.Content>
                                </Button>
                                <Button.Or />
                                <Button
                                    animated='vertical'
                                    onClick={this.handleAnswered}
                                >
                                    <Button.Content hidden>answered</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='search' />
                                    </Button.Content>
                                </Button>
                            </Button.Group>
                        </Grid.Row>
                        <Grid.Row>
                            <Segment.Group>

                                <Segment>
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
                                </Segment>


                            </Segment.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </Container>
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