// import logo from './logo.svg';
// <img src={logo} className="App-logo" alt="logo" />

import React, {Component} from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import {handleInitData} from "../actions/shared";
import Home from "./Home";


class App extends Component {

    componentDidMount() {
        this.props.handleInitData();
    }

    render() {

        const { loading } = this.props;

        return (
            <div>
                <LoadingBar/>
                {
                    loading === true
                        ? null
                        : <Home/>

                }
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