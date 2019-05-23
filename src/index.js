import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { BrowserRouter} from 'react-router-dom';
import createSagaMiddleware from 'redux-saga'

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import burgerReducer from './store/reducers/burgerReducer';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas'



// Setup Redux
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: burgerReducer,
    order: orderReducer,
    auth: authReducer
})

// setup redux Saga
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder)
sagaMiddleware.run(watchOrders)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
