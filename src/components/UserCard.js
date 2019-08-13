import React, {Component,Fragment} from 'react';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';
import {
    Grid,
    Header,
    Button,
    Image
} from "semantic-ui-react";


class UserCard extends Component {


    render() {

        const { users, question, question_type } = this.props;

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
                                        color="green"
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
                                        color="blue"
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