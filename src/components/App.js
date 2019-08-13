// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />

import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import LoadingBar from 'react-redux-loading';
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
    Responsive
} from "semantic-ui-react";

const getWidth = () => {
    const isSSR = typeof window === 'undefined'

    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}



class App extends Component {

    componentDidMount() {
        this.props.handleInitData();
    }

    render() {

        const { loading } = this.props;

        return (
            <div>
                <LoadingBar/>
                <Router>
                    {
                        loading === true ? (
                            <Login/>
                        ) : (
                            <Fragment>
                                <Nav/>
                                <div>
                                    <Switch>
                                        <Route path='/' exact component={Home} />
                                        <Route path='/add' exact component={NewQuestion} />
                                        <Route path='/leaderboard' exact component={LeaderBoard} />
                                        <Route path='/questions/:id' exact component={Question} />
                                        <Route path='/results/:id' exact component={Result} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </div>
                            </Fragment>
                        )
                    }
                </Router>
            </div>
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