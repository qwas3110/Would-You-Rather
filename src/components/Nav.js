import React, {Component} from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {setAuthUser} from "../actions/authUser";

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.setAuthUser(null);
    };


    render() {

        const { users, authUser } = this.props

        return (
            <div>
                <div>
                    <ul>
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/add' exact activeClassName='active'>
                                New Question
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' exact activeClassName='active'>
                                LeaderBoard
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <span>Hello, {users[authUser].name}</span>
                    <img src={users[authUser].avatarURL}/>
                    <button onClick={this.handleLogout}>
                        logout
                    </button>
                </div>
            </div>
        );
    }

}


function mapStateToProps ( { users, authUser } ) {
    return {
        users,
        authUser
    }
}

export default connect(
    mapStateToProps,
    {setAuthUser}
)(Nav)