import React, {Component} from 'react';
import { connect } from 'react-redux';
import {setAuthUser} from "../actions/authUser";
import { withRouter } from 'react-router-dom';


class Login extends Component {


    state = {
        value: ''
    };

    handleChange = (value) => {
        this.setState({value})
    };

    handleSubmit = () => {
        if (this.state.value !== '') {
            this.props.setAuthUser(this.state.value);
            this.props.history.push('/')
        }
    };


    render() {

        const { authUser, users } = this.props;
        const { value } = this.state;



        return (
            <div>
                <header>
                    <h1>Welcome to the would you rather App!</h1>
                    <p>Please sign in to continue</p>
                </header>
                <div>
                    <img src="/images/logo.svg" alt="logo"/>
                </div>

                <div>
                    <select value={value}
                            onChange={(e) => this.handleChange(e.target.value)}
                            >
                        <option value="">Choose a User</option>
                        {users.length > 0 &&
                        users.map((user) => (
                            <option value={user.id} key={user.id}>{user.name}</option>
                        ))}
                    </select >
                    <button type="submit"
                            onClick={this.handleSubmit}
                            disabled={!value}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

}



function mapStateToProps ({ authUser, users }) {
    return {
        authUser,
        users:Object.values(users)
    }
}



export default withRouter(
    connect(
        mapStateToProps,
        { setAuthUser }
    )(Login)
)
