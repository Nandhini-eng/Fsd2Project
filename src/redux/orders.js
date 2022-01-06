import * as ActionTypes from './ActionTypes';

export const Orders = (state = {
        errMess: null, 
        orders:[]
    }, action) => {

    switch (action.type) {
        case ActionTypes.ORDERS_PLACED:
            return {...state, errMess: null, orders: action.payload};

        case ActionTypes.ORDER_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ORDER_PLACED:
            var order = action.payload;
            return {...state, orders: state.orders.concat(order)};

        default:
          return state;
    }
};