import React, {Component} from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class Nav extends Component {


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
    mapStateToProps
)(Nav)