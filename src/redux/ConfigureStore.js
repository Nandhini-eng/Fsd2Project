import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Newspapers } from './newspapers';
import { Magazines } from './magazines';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import LoginReducer from './LoginReducer'

export const ConfigureStore = () => {
    
    const store = createStore(
        combineReducers({
            newspapers: Newspapers,
            magazines: Magazines,
            login: LoginReducer,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
