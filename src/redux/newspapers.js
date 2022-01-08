import * as ActionTypes from './ActionTypes';

export const Newspapers = (state = {
    isLoading: true,
    errMess: null,
    newspapers:[],
    sortedNewspapers:[],
    sort:'',
    filteredItems:[],
    language: ''
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_NEWSPAPERS:
            return {...state, isLoading: false, errMess: null, newspapers: action.payload, filteredItems: action.payload,sortedNewspapers:action.payload};
        
        case ActionTypes.NEWSPAPERS_LOADING:
            return {...state, isLoading: true, errMess: null, newspapers: []}
        
        case ActionTypes.NEWSPAPERS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, newspapers: []}  
            
        case ActionTypes.FILTER_NEWSPAPERS_BY_LANG:
            return {...state, filteredItems: action.payload.items, language: action.payload.lang}
        //Action type which change the state of sortedNewspapers 
        case ActionTypes.SORT_NEWSPAPERS:
            return {...state, sortedNewspapers: action.payload.items, sort: action.payload.sort}          
        
        default:
          return state;
    }
};