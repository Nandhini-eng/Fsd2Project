import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Account from './AccountComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import NewspapersMain from './NewspapersComponent';
import Cart from './Cart';
import {Login} from './Login';
import NewspaperDetail from './NewspaperDetail';
import MagazinesMain from './MagazinesComponent';
import MagazineDetail from './MagazineDetail';
import Signup from './Signup';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNewspapers, fetchMagazines, filterMagazinesByCategory, 
  filterMagazinesByLanguage, filterNewspapersByLanguage, sortNewspapers,sortMagazines, postFeedback,postsignup,fetchUsers,fetchReviews, postReview, 
    getproducts,addToCart,removefromCart,adjustQty, getTopNewspapers, getTopMagazines } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';


const mapStateToProps = (state) => (
  {
    newspapers: state.newspapers,
    magazines: state.magazines,
    cartitem: state.cartReducer, 
    regusers: state.regusers,
    reviews: state.reviews
    
  }
);

const mapDispatchToProps = (dispatch) => ({
  
    fetchNewspapers: () => {dispatch(fetchNewspapers())},
    fetchMagazines: () => {dispatch(fetchMagazines())},
    fetchUsers: ()=> {dispatch(fetchUsers())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)), 
    postsignup:(username,password)=>dispatch(postsignup(username,password)),
    filterMagsByCategory: (magazines,category) => dispatch(filterMagazinesByCategory(magazines,category)),
    filterMagsByLanguage: (magazines,language) => dispatch(filterMagazinesByLanguage(magazines,language)),
    filterNewspapersByLanguage: (newspapers,language) => dispatch(filterNewspapersByLanguage(newspapers,language)),
    sortNewspapers: (newspapers,sort)=>dispatch(sortNewspapers(newspapers,sort)),
    sortMagazines: (magazines,sort)=>dispatch(sortMagazines(magazines,sort)),
    fetchReviews: () => {dispatch(fetchReviews())}, 
    postReview: (itemId, rating, author, review) => dispatch(postReview(itemId, rating, author, review)),
    getproducts: (newspapers,magazines)=>{dispatch(getproducts(newspapers,magazines))},
    addtocart: (id)=>{dispatch(addToCart(id))},
    // removefromCart:(id)=>{dispatch(removefromCart(id))},
    // adjustQty:(id)=>{dispatch(adjustQty(id))}
    topRatedNewspapers: (newspapers,reviews) => dispatch(getTopNewspapers(newspapers,reviews)),
    topRatedMagazines: (magazines,reviews) => dispatch(getTopMagazines(magazines,reviews)),

});

class Main extends Component{
   
    componentDidMount() {
      this.props.fetchNewspapers();
      this.props.fetchMagazines();
      this.props.fetchUsers();
      this.props.fetchReviews();
    }

    

    render() {
      

        const HomePage = () => {
            return(
              <Home 
                newspapers={this.props.newspapers.newspapers.filter((newspaper) => newspaper.featured)}
                newspapersLoading={this.props.newspapers.isLoading}
                newspapersErrMess={this.props.newspapers.errMess}
                magazines={this.props.magazines.magazines.filter((magazine) => magazine.featured)}
                regusers={this.props.regusers}
              />
            );
        }

        const NewspapersMainPage = () => {
          return(
            <NewspapersMain 
              newspapers={this.props.newspapers} 
              filterByLanguage={this.props.filterNewspapersByLanguage} 
              sort_newspapers={this.props.sortNewspapers} 
              reviews={this.props.reviews.reviews} 
              topNewspapers={this.props.topRatedNewspapers} 
            />
          );
        }

        const MagazinesMainPage = () => {
          return(
            <MagazinesMain 
              magazines={this.props.magazines} 
              filterByCategory={this.props.filterMagsByCategory} 
              filterByLanguage={this.props.filterMagsByLanguage} 
              sort_magazines={this.props.sortMagazines} 
              reviews={this.props.reviews.reviews} 
              topMagazines={this.props.topRatedMagazines} 
            />
          );
        }

        const NewspaperWithId = ({match}) => {
          return(
            <NewspaperDetail paperSelected={this.props.newspapers.newspapers.filter((paper) => paper.id === parseInt(match.params.paperId,10))[0]} 
              isLoading={this.props.newspapers.isLoading}
              errMess={this.props.newspapers.errMess}
              reviews={this.props.reviews.reviews.filter((review) => review.itemId === parseInt(match.params.paperId,10))} 
              reviewsErrMess={this.props.reviews.errMess}
              postReview={this.props.postReview}
              addtocart={this.props.addtocart}
              />
        );
        }

        const MagazineWithId = ({match}) => {
          return(
            <MagazineDetail magSelected={this.props.magazines.magazines.filter((magazine) => magazine.id === parseInt(match.params.magId,10))[0]} 
              isLoading={this.props.magazines.isLoading}
              errMess={this.props.magazines.errMess}
              reviews={this.props.reviews.reviews.filter((review) => review.itemId === parseInt(match.params.magId,10))} 
              reviewsErrMess={this.props.reviews.errMess}
              postReview={this.props.postReview}
              addtocart={this.props.addtocart}
              />
        );
        }

        // var items_reviews = [];
        
        // var item_review = {};
        // var len = this.props.newspapers.newspapers.length + this.props.magazines.magazines.length;

    
        // for (var i=0;i<len;i++){
        //   var sum = 0, avg = 0;
        //   item_review.itemId = i;
        //   var revs = this.props.reviews.reviews.filter(rev => rev.itemId === i);
        //   //console.log(JSON.stringify(revs));
        //   if (revs.length){
        //     sum = revs.map(rev=>rev.rating).reduce((r1,r2)=>r1+r2,0);
        //     avg = sum/revs.length;
        //   }
        //   item_review.avgRating = avg;
        //   items_reviews.push({...item_review});
        // }
        // console.log(JSON.stringify(items_reviews));
        

        // var filtered_revs = items_reviews.filter(rev => rev.avgRating >= 4 && rev.avgRating <= 5)
        // console.log(JSON.stringify(filtered_revs));
      
        // console.log(filtered_revs.length);
        
        return(
            <div>
              <Header /> 
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path ='/login' component={()=><Login {...this.props}/>}/> 
                <Route exact path='/signup' component={()=><Signup {...this.props}/>}/>
                <Route exact path='/newspapers' component={NewspapersMainPage} />
                <Route path='/newspapers/:paperId' component={NewspaperWithId}   />
                <Route exact path='/magazines' component={MagazinesMainPage} />
                <Route path='/magazines/:magId' component={MagazineWithId} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> 
                <Route path='/myaccount' component={() => <Account />} />
                <Route path='/aboutus' component={() => <About />} />
                <Route path='/cart' component={() => <Cart getproducts={this.props.getproducts} newspapers={this.props.newspapers} magazines={this.props.magazines} cart={this.props.cartitem.cart}  />} />
                <Redirect to="/home" />    
              </Switch>
              <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
