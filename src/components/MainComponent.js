import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Account from './AccountComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import NewspapersMain from './NewspapersComponent';
import Cart from './Cart';
import NewspaperDetail from './NewspaperDetail';
import MagazinesMain from './MagazinesComponent';
import MagazineDetail from './MagazineDetail';
import * as signin from './Login';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNewspapers, fetchMagazines, filterMagazinesByCategory, filterMagazinesByLanguage, 
    filterNewspapersByLanguage, sortNewspapers,sortMagazines, postFeedback, fetchReviews, postReview, 
    getproducts,addToCart,removefromCart,adjustQty,fetchOrders,postOrder,fetchItems } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import ShippingAddress from './ShippingAddress';
import OrdersComponent from './OrdersComponent';
import {user_real} from "./Login";

const mapStateToProps = (state) => (
  {
    newspapers: state.newspapers,
    magazines: state.magazines,  
    reviews: state.reviews,
    cartitem: state.cartReducer,  
    orders: state.orders
  }
);

const mapDispatchToProps = (dispatch) => ({
  
    fetchNewspapers: () => {dispatch(fetchNewspapers())},
    fetchMagazines: () => {dispatch(fetchMagazines())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)), 
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
              checkorders={this.props.orders.orders}
              />
        );
        }
        

        return(
            <div>
              <Header /> 
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path ="/login" component={signin.Login}/>
                <Route exact path='/newspapers' component={() => <NewspapersMain newspapers={this.props.newspapers} filterByLanguage={this.props.filterNewspapersByLanguage} sort_newspapers={this.props.sortNewspapers} />} />
                <Route path='/newspapers/:paperId' component={NewspaperWithId}   />
                <Route exact path='/magazines' component={() => <MagazinesMain magazines={this.props.magazines} filterByCategory={this.props.filterMagsByCategory} filterByLanguage={this.props.filterMagsByLanguage} sort_magazines={this.props.sortMagazines} />} />
                <Route path='/magazines/:magId' component={MagazineWithId} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> 
                <Route path='/myaccount' component={() => <Account />} />
                <Route path='/aboutus' component={() => <About />} />
                <Route path='/cart' component={() => <Cart getproducts={this.props.getproducts} newspapers={this.props.newspapers} magazines={this.props.magazines} cart={this.props.cartitem.cart}  />} />
                <Route path='/address' component={()=><ShippingAddress resetCheckoutForm={this.props.resetCheckoutForm} postOrder={this.props.postOrder} cart={this.props.cartitem.cart}/>}/>
                <Route path='/orders' component={()=><OrdersComponent orders={this.props.orders.orders.filter((order)=>order.user === user_real)} ordersErrMess={this.props.orders.errMess}/>}/>
                <Redirect to="/home" />


              </Switch>
              <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));