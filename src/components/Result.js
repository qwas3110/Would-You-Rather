import React, {Component} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NoMatch from "./NoMatch";
import {
    Label,
    Icon,
    Container,
    Segment,
    Header,
    Progress,
    Button,
    Image,
    Grid
} from "semantic-ui-react";

const AnswerLabel = () => (
    <Label color='teal' ribbon="right">
        <Icon name="smile outline" size="big"/>
        <div style={{ float: 'right' }}>
            Your
            <br />
            Answer
        </div>
    </Label>
);


class Result extends Component {


    goBack = () => {
        this.props.history.push('/');
    }


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
                {question && (
                    <Container>
                        <Grid divided padded>
                            <Grid.Row>
                                <Grid.Column width={5}>
                                    <Image src={users[question.author].avatarURL} />
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <Header as="h3">
                                        Results:
                                        <Header.Subheader style={{ fontWeight: 'bold' }}>
                                            Would you rather
                                        </Header.Subheader>
                                    </Header>
                                    <Segment>
                                        {authUserAnswer === 'optionOne' && <AnswerLabel/>}
                                        <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                                        <Progress
                                            percent={((oneVotes / total ) * 100).toFixed(2)}
                                            progress
                                        >
                                            {oneVotes} out of {total} votes
                                        </Progress>
                                    </Segment>
                                    <Segment>
                                        {authUserAnswer === 'optionTwo' && <AnswerLabel/>}

                                        <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
                                        <Progress
                                            percent={((twoVotes / total) * 100).toFixed(2)}
                                            progress
                                        >
                                            {twoVotes} out of {total} votes
                                        </Progress>
                                    </Segment>

                                    <Button size="tiny" floated="right" onClick={this.goBack}>
                                        Back
                                    </Button>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>



                    </Container>
                )}
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


export default withRouter(
    connect(
        mapStateToProps
    )(Result)
)