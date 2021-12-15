import * as ActionTypes from './ActionTypes';

export const Magazines = (state = {
    isLoading: true,
    errMess: null,
    magazines:[],
    filteredItems:[],
    category: '',
    language: ''
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_MAGAZINES:
            return {...state, isLoading: false, errMess: null, magazines: action.payload, filteredItems: action.payload};
        
        case ActionTypes.MAGAZINES_LOADING:
            return {...state, isLoading: true, errMess: null, magazines: []}
        
        case ActionTypes.MAGAZINES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, magazines: []} 
            
        case ActionTypes.FILTER_MAGAGINES_BY_CATEGORY:
            return {...state, filteredItems: action.payload.items, category: action.payload.category}  
            
        case ActionTypes.FILTER_MAGAGINES_BY_LANG:
            return {...state, filteredItems: action.payload.items, language: action.payload.lang}    
        
        default:
          return state;
    }
};