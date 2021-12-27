import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const fetchNewspapers = () => (dispatch) => {

    dispatch(NewspapersLoading(true));

    return fetch(baseUrl + 'newspapers')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(newspapers => dispatch(addNewspapers(newspapers)))
    .catch(error => dispatch(NewspapersFailed(error.message)));
}

export const NewspapersLoading = () => ({
    type: ActionTypes.NEWSPAPERS_LOADING
});

export const NewspapersFailed = (errmess) => ({
    type: ActionTypes.NEWSPAPERS_FAILED,
    payload: errmess
});

export const addNewspapers = (newspapers) => ({
    type: ActionTypes.ADD_NEWSPAPERS,
    payload: newspapers
});


export const fetchMagazines = () => (dispatch) => {

    dispatch(MagazinesLoading(true));

    return fetch(baseUrl + 'magazines')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(magazines => dispatch(addMagazines(magazines)))
    .catch(error => dispatch(MagazinesFailed(error.message)));
}

export const MagazinesLoading = () => ({
    type: ActionTypes.MAGAZINES_LOADING
});

export const MagazinesFailed = (errmess) => ({
    type: ActionTypes.MAGAZINES_FAILED,
    payload: errmess
});

export const addMagazines = (magazines) => ({
    type: ActionTypes.ADD_MAGAZINES,
    payload: magazines
});


export const filterMagazinesByCategory = (magazines, category) => (dispatch) => {
  return dispatch({
      type: ActionTypes.FILTER_MAGAGINES_BY_CATEGORY,
      payload : {
        category: category,
        items: category === '' ? magazines : magazines.filter((mag) => mag.category === category)
      }
  })
}

export const filterMagazinesByLanguage = (magazines, lang) => (dispatch) => {
  return dispatch({
      type: ActionTypes.FILTER_MAGAGINES_BY_LANG,
      payload : {
        lang: lang,
        items: lang === '' ? magazines : magazines.filter((mag) => mag.language === lang)
      }
  })
}

export const filterNewspapersByLanguage = (newspapers, lang) => (dispatch) => {
  return dispatch({
      type: ActionTypes.FILTER_NEWSPAPERS_BY_LANG,
      payload : {
        lang: lang,
        items: lang === '' ? newspapers : newspapers.filter((newspaper) => newspaper.language === lang)
      }
  })
}

export const sortNewspapers = (products,sort)=>(dispatch)=>{
  if (sort === "lowestprice") {
    products.sort((a, b) =>
         a.price > b.price ? 1: -1)}
  else if(sort === "highestprice"){
    products.sort((a,b)=>
    a.price < b.price ? 1 : -1
    );
  } 
  else if(sort === "prname"){
    products.sort((a,b)=>
    a.name.toLowerCase()>b.name.toLowerCase() ? 1 : -1)
  }
  else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  return dispatch({
    type:ActionTypes.SORT_NEWSPAPERS,
    payload:{
      sort: sort,
      items : products
    }
  })
}
export const sortMagazines = (products,sort)=>(dispatch)=>{
  if (sort === "lowestprice") {
    products.sort((a, b) =>
         a.price > b.price ? 1: -1)}
  else if(sort === "highestprice"){
    products.sort((a,b)=>
    a.price < b.price ? 1 : -1
    );
  } 
  else if(sort === "prname"){
    products.sort((a,b)=>
    a.name.toLowerCase()>b.name.toLowerCase() ? 1 : -1)
  }
  else {
    products.sort((a, b) => (a.id > b.id ? 1 : -1));
  }
  return dispatch({
    type:ActionTypes.SORT_MAGAZINES,
    payload:{
      sort: sort,
      items : products
    }
  })
}

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message) => (dispatch) => {
   
    const newFeedback = {
       firstname: firstname,
       lastname: lastname,
       telnum: telnum,
       email: email,
       agree: agree,
       contactType: contactType,
       message: message
     };
  
    
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(newFeedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(feedback => alert('Thank you for your feedback!\n'+ JSON.stringify(feedback)))
    .catch(error =>  { console.log('Post Feedback', error.message); alert('Your Feedback could not be posted\nError: '+error.message); });
};


export const addReview = (review) => ({
  type: ActionTypes.ADD_REVIEW,
  payload: review
});

export const postReview = (itemId, rating, author, review) => (dispatch) => {

  const newReview = {
      itemId: itemId,
      rating: rating,
      author: author,
      review: review
  };
  newReview.date = new Date().toISOString();
  
  return fetch(baseUrl + 'reviews', {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addReview(response)))
  .catch(error =>  { console.log('post reviews', error.message); alert('Your review could not be posted\nError: '+error.message); });
};

export const fetchReviews = () => (dispatch) => {    
  return fetch(baseUrl + 'reviews')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(reviews => dispatch(addReviews(reviews)))
  .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsFailed = (errmess) => ({
  type: ActionTypes.REVIEWS_FAILED,
  payload: errmess
});

export const addReviews = (reviews) => ({
  type: ActionTypes.ADD_REVIEWS,
  payload: reviews
});


export const addMagazineReview = (review) => ({
  type: ActionTypes.ADD_MAGAZINE_REVIEW,
  payload: review
});

export const postMagazineReview = (itemId, rating, author, review) => (dispatch) => {

  const newReview = {
      itemId: itemId,
      rating: rating,
      author: author,
      review: review
  };
  newReview.date = new Date().toISOString();
  
  return fetch(baseUrl + 'magazine_reviews', {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => dispatch(addMagazineReview(response)))
  .catch(error =>  { console.log('post reviews', error.message); alert('Your review could not be posted\nError: '+error.message); });
};

export const fetchMagazineReviews = () => (dispatch) => {    
  return fetch(baseUrl + 'magazine_reviews')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(reviews => dispatch(addMagazineReviews(reviews)))
  .catch(error => dispatch(magazine_reviewsFailed(error.message)));
};

export const magazine_reviewsFailed = (errmess) => ({
  type: ActionTypes.MAGAZINE_REVIEWS_FAILED,
  payload: errmess
});

export const addMagazineReviews = (reviews) => ({
  type: ActionTypes.ADD_MAGAZINE_REVIEWS,
  payload: reviews
});