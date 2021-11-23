import * as ActionTypes from './ActionTypes';

export const Newspapers = (state = {
    isLoading: true,
    errMess: null,
    newspapers:[]
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_NEWSPAPERS:
            return {...state, isLoading: false, errMess: null, newspapers: action.payload};
        
        case ActionTypes.NEWSPAPERS_LOADING:
            return {...state, isLoading: true, errMess: null, newspapers: []}
        
        case ActionTypes.NEWSPAPERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, newspapers: []}    
        
        default:
          return state;
    }
};