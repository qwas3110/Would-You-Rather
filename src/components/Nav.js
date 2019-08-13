import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {setAuthUser} from "../actions/authUser";
import {
    Menu,
    Container,
    Button,
    Image,
    Icon
} from "semantic-ui-react";

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault();
        this.props.setAuthUser(null);
    };


    render() {

        const { users, authUser } = this.props

        return (
            <Container>
                <Menu>
                    <Menu.Item name="home" as={NavLink} to="/" exact />
                    <Menu.Item name="new question" as={NavLink} to='/add' exact />
                    <Menu.Item name="leader board" as={NavLink} to='/leaderboard' exact />
                    <Menu.Menu position='right'>
                        <Menu.Item >
                            <span
                                style={{
                                    paddingRight: '5px'
                                }}
                                >
                                {users[authUser].name}
                            </span>
                            <Image src={users[authUser].avatarURL}
                                   alt={`Avatar in ${users[authUser].name}`}
                                   avatar
                            />
                        </Menu.Item>
                        <Menu.Item >
                            <Button animated
                                    onClick={this.handleLogout}
                            >
                                <Button.Content visible>LogOut</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign-out' />
                                </Button.Content>
                            </Button>
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </Container>
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