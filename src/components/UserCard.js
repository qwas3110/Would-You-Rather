import React, {Fragment} from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
    Grid,
    Header,
    Button,
    Image
} from "semantic-ui-react";


const UserCard = (props) => {

    const { users, question, question_type } = props;

    if (question === undefined) {
        return <Redirect to="/questions/nomatch" />;
    }
    return (
        <Fragment>
            <Grid celled>
                <Grid.Row color="grey">
                    <Grid.Column width={16} textAlign="left">
                        {users[question.author].name} asks:
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <Image src={users[question.author].avatarURL} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Header as="h5" textAlign="left">
                            Would you rather
                        </Header>
                        <p>
                            {question.optionOne.text}...
                            <br />
                            or...
                        </p>
                        {
                            question_type === 'unanswered' && (
                                <Button
                                    as={NavLink}
                                    to={`/questions/${question.id}`}
                                    content='View Poll'
                                    size="tiny"
                                    fluid positive
                                />
                            )

                        }

                        {
                            question_type === 'answered' && (
                                <Button
                                    as={NavLink}
                                    to={`/results/${question.id}`}
                                    content='View Answer'
                                    size="tiny"
                                    fluid positive
                                />
                            )
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment>
    );

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