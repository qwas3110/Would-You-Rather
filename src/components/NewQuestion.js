import React, {Component} from 'react';
import { connect } from 'react-redux';
import {handleSaveQuestion} from "../actions/shared";
import { withRouter } from 'react-router-dom';
import {
    Container,
    Header,
    Grid,
    Dimmer,
    Loader,
    Form,
    Divider,
    Message
} from "semantic-ui-react";


class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
        loading: false
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    };

    handleLoading = () => {
        this.setState({loading: true})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {authUser, handleSaveQuestion} = this.props;
        const one = this.state.optionOne;
        const two = this.state.optionTwo;

        new Promise(resolve => {
            this.handleLoading();
            setTimeout(() => resolve(), 1000)
        }).then(() => {
            handleSaveQuestion(one,two, authUser)
            this.setState({
                optionOne: '',
                optionTwo: '',
                loading: false
            });
            this.props.history.push('/');
        })

    };


    render() {

        const { loading, optionOne, optionTwo } = this.state;

        return (
            <Container>
                <Grid padded>
                    <Grid.Column>
                        <Header as="h1" textAlign="center" block attached="top">
                            Create a New Question
                        </Header>
                        {loading && (
                            <Dimmer active inverted>
                                <Loader content="Updating" />
                            </Dimmer>
                        )}
                        <Message>
                            <Message.Header>Description:</Message.Header>
                            <Message.List>
                                <Message.Item>Complete the question:</Message.Item>
                                <Message.Item>Would you rather...</Message.Item>
                            </Message.List>
                        </Message>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                id="optionOne"
                                placeholder="Enter option one..."
                                value={optionOne}
                                onChange={this.handleChange}
                                required
                            />
                            <Divider horizontal>Or</Divider>
                            <Form.Input
                                id="optionTwo"
                                placeholder="Enter option two..."
                                value={optionTwo}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Button positive size="tiny" fluid disabled={!optionOne && !optionTwo}>
                                Submit
                            </Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid>

            </Container>
        );
    }

}

function mapStateToProps ({ authUser, questions }) {
    return {
        authUser,
        questions
    }
}


export default withRouter(
    connect(
        mapStateToProps,
        {handleSaveQuestion}
    )(NewQuestion)
)