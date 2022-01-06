import * as ActionTypes from './ActionTypes';

export const Magazines = (state = {
    isLoading: true,
    errMess: null,
    magazines:[],
    filteredItemsbyLang:[],
    filteredItemsbyCtgry:[],
    category: '',
    language: '',
    sortedMagazines:[],
    sort: ''
    }, action) => {

    switch (action.type) {
        case ActionTypes.ADD_MAGAZINES:
            return {...state, isLoading: false, errMess: null, magazines: action.payload, filteredItemsbyLang: action.payload, filteredItemsbyCtgry: action.payload,  sortedMagazines:action.payload};
        
        case ActionTypes.MAGAZINES_LOADING:
            return {...state, isLoading: true, errMess: null, magazines: []}
        
        case ActionTypes.MAGAZINES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, magazines: []}  
            
        case ActionTypes.FILTER_MAGAGINES_BY_LANG:
            return {...state, filteredItemsbyLang: action.payload.items, filteredItemsbyCtgry: action.payload.magazines, language: action.payload.lang}   

        case ActionTypes.FILTER_MAGAGINES_BY_CATEGORY:
            return {...state, filteredItemsbyCtgry: action.payload.items, filteredItemsbyLang: action.payload.magazines, category: action.payload.category} 
             
        case ActionTypes.SORT_MAGAZINES:
            return {...state, sortedMagazines: action.payload.items, sort: action.payload.sort}

        case ActionTypes.TOP_RATED_MAGAZINES:
            return {...state, filteredItemsbyCtgry: action.payload.items, filteredItemsbyLang: action.payload.magazines}

        default:
          return state;
    }
};