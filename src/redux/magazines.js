import * as ActionTypes from './ActionTypes';

export const Magazines = (state = {
    isLoading: true,
    errMess: null,
    magazines:[],
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_MAGAZINES:
            return {...state, isLoading: false, errMess: null, magazines: action.payload};
        
        case ActionTypes.MAGAZINES_LOADING:
            return {...state, isLoading: true, errMess: null, magazines: []}
        
        case ActionTypes.MAGAZINES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, magazines: []} 
        
        default:
          return state;
    }
};