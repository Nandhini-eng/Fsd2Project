import * as ActionTypes from './ActionTypes';

export const Magazine_Reviews = (state = {
        errMess: null, 
        reviews:[]
    }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_MAGAZINE_REVIEWS:
            return {...state, errMess: null, reviews: action.payload};

        case ActionTypes.MAGAZINE_REVIEWS_FAILED:
            return {...state, errMess: action.payload};

        case ActionTypes.ADD_MAGAZINE_REVIEW:
            var review = action.payload;
            return {...state, reviews: state.reviews.concat(review)};

        default:
          return state;
      }
};