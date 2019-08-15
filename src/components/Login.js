import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setAuthUser} from "../actions/authUser";
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Dimmer,
    Loader
} from "semantic-ui-react";

class Login extends Component {


    state = {
        value: '',
        loading: false
    };

    handleLoading = () => {
        this.setState({loading: true})
    };

    handleChange = (e,{value}) => {
        this.setState({value})
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.value !== '') {
            new Promise(resolve => {
                this.handleLoading();
                setTimeout(() => resolve(), 1000)
            }).then(() => {
                this.props.setAuthUser(this.state.value);
            })
        }
    };

    getUserData = () => {
        const { users } = this.props;

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
    };


    render() {
        const { loading, value } = this.state;
        return (
            <Grid
                textAlign='center'
                verticalAlign='middle'
                style={{
                    marginTop: 10
                }}
                >
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/images/logo.svg' /> Would You Rather ?
                    </Header>

                    <Form size='large'
                          onSubmit={this.handleSubmit}
                    >

                        {
                            loading === true && (
                                <Dimmer active inverted>
                                    <Loader inverted content='Loading' />
                                </Dimmer>
                            )
                        }
                        <Segment stacked>
                            <Form.Dropdown
                                placeholder="Select User"
                                fluid
                                selection
                                scrolling
                                options={this.getUserData()}
                                value={value}
                                onChange={this.handleChange}
                                required
                            />

                            <Form.Button
                                content="Login"
                                positive disabled={!value}
                                fluid />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}



function mapStateToProps ({ authUser, users }) {
    return {
        authUser,
        users:Object.values(users)
    }
}

export default connect(
    mapStateToProps,
    {setAuthUser}
)(Login)