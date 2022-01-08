import * as ActionTypes from './ActionTypes';

export const Magazines = (state = {
    isLoading: true,
    errMess: null,
    magazines:[],
    filteredItems:[],
    category: '',
    language: '',
    sortedMagazines:[],
    sort: ''
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_MAGAZINES:
            return {...state, isLoading: false, errMess: null, magazines: action.payload, filteredItems: action.payload, sortedMagazines:action.payload};
        
        case ActionTypes.MAGAZINES_LOADING:
            return {...state, isLoading: true, errMess: null, magazines: []}
        
        case ActionTypes.MAGAZINES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, magazines: []} 
            
        case ActionTypes.FILTER_MAGAGINES_BY_CATEGORY:
            return {...state, filteredItems: action.payload.items, category: action.payload.category}  
            
        case ActionTypes.FILTER_MAGAGINES_BY_LANG:
            return {...state, filteredItems: action.payload.items, language: action.payload.lang}  
        //Action Type which change the state of sortedMagazines  
        case ActionTypes.SORT_MAGAZINES:
            return {...state, sortedMagazines: action.payload.items, sort: action.payload.sort}
        default:
          return state;
    }
};