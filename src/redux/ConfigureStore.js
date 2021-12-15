import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Newspapers } from './newspapers';
import { Magazines } from './magazines';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const ConfigureStore = () => {
    
    const store = createStore(
        combineReducers({
            newspapers: Newspapers,
            magazines: Magazines,
            ...createForms({
                feedback: InitialFeedback
            })
        }),
        composeEnhancers(applyMiddleware(thunk, logger))

    );

    return store;
}
