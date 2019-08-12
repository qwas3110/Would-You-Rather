import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App'
import {createStore} from "redux";
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import middleWare from './middleware/index';

const store = createStore(rootReducer,middleWare);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

