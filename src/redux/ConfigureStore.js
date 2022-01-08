import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Newspapers } from './newspapers';
import { Magazines } from './magazines';
import { cartReducer } from './cartReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback, InitialOrder } from './forms';
import LoginReducer from './LoginReducer'
import { signfeed } from './register'
import { Reviews } from './reviews';
import { Orders } from "./orders";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            newspapers: Newspapers,
            magazines: Magazines,
            login: LoginReducer,
            regusers: signfeed,
            reviews: Reviews,
            orders: Orders,
            ...createForms({
                feedback: InitialFeedback,
                order: InitialOrder

            }),
            cartReducer: cartReducer,
        }),
        composeEnhancers(applyMiddleware(thunk, logger))

    );

    return store;
}
