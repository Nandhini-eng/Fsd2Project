import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Newspapers } from './newspapers';
import { Magazines } from './magazines';
import {cartReducer} from './cartReducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { createForms } from 'react-redux-form';
import { InitialFeedback } from './forms';
import LoginReducer from './LoginReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cartFromLocalStorage = localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[]
const INITIAL_STATE={
    cart:{
        cart: cartFromLocalStorage,
        shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
        paymentDetails: localStorage.getItem('paymentDetails')
        ? JSON.parse(localStorage.getItem('paymentDetails'))
        :{}
    }
}
export const ConfigureStore = () => {

    
    const store = createStore(
        combineReducers({
            newspapers: Newspapers,
            magazines: Magazines,
            login: LoginReducer,
            ...createForms({
                feedback: InitialFeedback
            }),
            cartReducer:cartReducer,
        }),
        INITIAL_STATE,
        composeEnhancers(applyMiddleware(thunk, logger))

    );

    return store;
}
