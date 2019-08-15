// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />

import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {handleInitData} from "../actions/shared";

import Home from "./Home";
import NewQuestion from "./NewQuestion";
import LeaderBoard from "./LeaderBoard";
import Login from "./Login";
import Nav from "./Nav";
import NoMatch from "./NoMatch";
import Question from "./Question";
import Result from "./Result";
import {
    Grid,
    Container
} from "semantic-ui-react";





class App extends Component {

    componentDidMount() {
        this.props.handleInitData();
    }

    render() {

        const { loading } = this.props;

        return (
            <Router>
                <Container>
                    {
                        loading === true ? (
                            <Grid padded="vertically" columns={1} centered>
                                <Grid.Row>
                                    <Grid.Column style={{ maxWidth: 550 }}>
                                        <Login/>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        ) : (

                            <Fragment>
                                <Nav/>
                                <Grid padded="vertically" columns={1} centered>
                                    <Grid.Row>
                                        <Grid.Column style={{ maxWidth: 550 }}>
                                            <Switch>
                                                <Route path='/' exact component={Home} />
                                                <Route path="/questions/nomatch" exact component={NoMatch} />
                                                <Route path='/add' exact component={NewQuestion} />
                                                <Route path='/leaderboard' exact component={LeaderBoard} />
                                                <Route path='/questions/:id' exact component={Question} />
                                                <Route path='/results/:id' exact component={Result} />
                                                <Route component={NoMatch} />
                                            </Switch>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Fragment>
                        )
                    }
                </Container>
            </Router>
        );
    }

}



function mapStateToProps ({ authUser }) {
    return {
        loading: authUser === null
    }
}


export default connect(
    mapStateToProps,
    { handleInitData }
)(App);