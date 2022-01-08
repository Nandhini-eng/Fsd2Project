import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Account from './AccountComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import NewspapersMain from './NewspapersComponent';
import Searchc from './Searchc';
import Cart from './Cart';
import {Login} from './Login';
import NewspaperDetail from './NewspaperDetail';
import MagazinesMain from './MagazinesComponent';
import ItemDetail from './ItemDetail';
import MagazineDetail from './MagazineDetail';
import Signup from './Signup';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchNewspapers, fetchMagazines, filterMagazinesByCategory, 
  filterMagazinesByLanguage, 
    filterNewspapersByLanguage, sortNewspapers,sortMagazines, postFeedback,postsignup,fetchUsers,fetchReviews, postReview, 
    getproducts,addToCart,removefromCart,adjustQty,fetchOrders,postOrder,fetchItems} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import Checkout from './Checkout';
import OrdersComponent from './OrdersComponent';
import {user_real} from "./Login";
const mapStateToProps = (state) => (
  {
    newspapers: state.newspapers,
    magazines: state.magazines,  
    reviews: state.reviews,
    cartitem: state.cartReducer,  
    orders: state.orders,
    regusers:state.regusers, 
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
    resetCheckoutForm:()=>{dispatch(actions.reset('order'))},
    fetchOrders:()=>{dispatch(fetchOrders())},
    postOrder:(fullName,address,city, postalCode, country,NameOnCard,CreditCardNum,ExpMon,ExpYear,Cvv,cart,user,price,items)=>dispatch(postOrder(fullName,address,city, postalCode, country,NameOnCard,CreditCardNum,ExpMon,ExpYear,Cvv,cart,user,price,items)),
    // removefromCart:(id)=>{dispatch(removefromCart(id))},
    // adjustQty:(id)=>{dispatch(adjustQty(id))}
    fetchItems:()=>{dispatch(fetchItems())},
});

class Main extends Component{
   
    componentDidMount() {
      this.props.fetchItems();
      this.props.fetchNewspapers();
      this.props.fetchMagazines();
      this.props.fetchUsers();
      this.props.fetchReviews();
      this.props.fetchOrders();
      
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

        const NewspaperWithId = ({match}) => {
          return(
            <NewspaperDetail paperSelected={this.props.newspapers.newspapers.filter((paper) => paper.id === parseInt(match.params.paperId,10))[0]} 
              isLoading={this.props.newspapers.isLoading}
              errMess={this.props.newspapers.errMess}
              reviews={this.props.reviews.reviews.filter((review) => review.itemId === parseInt(match.params.paperId,10))} 
              reviewsErrMess={this.props.reviews.errMess}
              postReview={this.props.postReview}
              addtocart={this.props.addtocart}
              getproducts={this.props.getproducts} 
              newspapers={this.props.newspapers} 
              magazines={this.props.magazines}
              
              checkorders={this.props.orders.orders}
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
              getproducts={this.props.getproducts} 
              newspapers={this.props.newspapers} 
              magazines={this.props.magazines}
              checkorders={this.props.orders.orders}
              />
        );
        }



        const ItemWithId = ({match}) => {
          return(
            <ItemDetail itemSelected={this.props.cartitem.items.filter((item) => item.id === parseInt(match.params.itemId,10))[0]} 
              isLoading={this.props.magazines.isLoading}
              errMess={this.props.magazines.errMess}
              addtocart={this.props.addtocart}
              getproducts={this.props.getproducts} 
              newspapers={this.props.newspapers} 
              magazines={this.props.magazines}
              reviews={this.props.reviews.reviews.filter((review) => review.itemId === parseInt(match.params.itemId,10))} 
              reviewsErrMess={this.props.reviews.errMess}
              postReview={this.props.postReview}
              checkorders={this.props.orders.orders}
              />
        );
        }

        
        return(
            <div>
              <Header /> 
              
              
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path ="/login" component={()=><Login {...this.props}/>}/> 
                <Route exact path="/signup" component={()=><Signup {...this.props}/>}/>
                <Route exact path='/newspapers' component={() => <NewspapersMain newspapers={this.props.newspapers} filterByLanguage={this.props.filterNewspapersByLanguage} sort_newspapers={this.props.sortNewspapers} />} />
                <Route path='/newspapers/:paperId' component={NewspaperWithId}   />
                <Route exact path='/magazines' component={() => <MagazinesMain magazines={this.props.magazines} filterByCategory={this.props.filterMagsByCategory} filterByLanguage={this.props.filterMagsByLanguage} sort_magazines={this.props.sortMagazines} />} />
                <Route path='/magazines/:magId' component={MagazineWithId} />
                
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> 
                <Route path='/myaccount' component={() => <Account />} />
                <Route path='/aboutus' component={() => <About />} />
                <Route path='/cart' component={() => <Cart getproducts={this.props.getproducts} newspapers={this.props.newspapers} magazines={this.props.magazines} cart={this.props.cartitem.cart}  />} />
                <Route exact path='/searchc' component={() => <Searchc />} />
                <Route path='/searchc/:itemId' component={ItemWithId} />  
               
                
                             
                <Route path='/checkout' component={()=><Checkout resetCheckoutForm={this.props.resetCheckoutForm} postOrder={this.props.postOrder} cart={this.props.cartitem.cart}/>}/>
                <Route path='/orders' component={()=><OrdersComponent orders={this.props.orders.orders.filter((order)=>order.user === user_real)} ordersErrMess={this.props.orders.errMess}/>}/>
                <Redirect to="/home" />


              </Switch>
              <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
