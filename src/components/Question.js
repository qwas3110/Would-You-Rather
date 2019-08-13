import React, {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {handleAnswerQuestion} from "../actions/shared";
import { withRouter } from 'react-router-dom';

import {
    Header,
    Form,
    Radio,
    Button,
    Grid,
    Image,
    Container,
    Segment
} from "semantic-ui-react";


class Question extends Component {

    state = {
        value : ''
    };

    handleChange = (e, {value}) => {
        this.setState({
            value
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
        const { value } = this.state;



        return (
            <Container>
                <Grid divided padded
                      style={{
                          border: '1px solid #ccc',
                          textAlign: 'center'
                      }}
                      >
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={users[question.author].avatarURL} />
                        </Grid.Column>
                        <Grid.Column
                            width={11}
                            >
                            <Header
                                as="h2"
                                content='Would you rather ?'
                            />
                            <Form
                                onSubmit={this.handleSubmit}
                                >
                                <Form.Field>
                                    <Radio
                                        label={question.optionOne.text}
                                        name="radioGroup"
                                        value="optionOne"
                                        checked={this.state.value === 'optionOne'}
                                        onChange={this.handleChange}
                                    />
                                    <br />
                                    <Radio
                                        label={question.optionTwo.text}
                                        name="radioGroup"
                                        value="optionTwo"
                                        checked={this.state.value === 'optionTwo'}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        color="green"
                                        size="tiny"
                                        fluid
                                        positive
                                        disabled={!value}
                                        content="Submit"
                                    />
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
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