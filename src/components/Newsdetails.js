import React,{ Component } from 'react';
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, FormGroup } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {user_real}  from './Login';
import ReactStars from 'react-stars';
import "./Details.css";
//import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class ReviewForm extends Component {

    constructor(props){
        super(props);

        this.state={
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        if (user_real){
            console.log('validated user');
            let cartItems = []
            cartItems = this.props.orders.map((order)=>order.cart.map((item)=>(item.id)))
            let flag = cartItems.some((value)=>value.some((id)=> (id === this.props.itemId)))
            if (flag){
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                })
            }
            else{
                alert("You cannot submit review as you have not subscibed this item!!")
            };
            
        }
        else{
            console.log('invalid user');
            this.props.history.push('/login');
        }
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postReview(this.props.itemId, parseInt(values.rating), user_real, values.review);
    }

    render() {
        return(
            <React.Fragment>
               <div className="col-12 col-md-7 m-1">
                <Button outline onClick={this.toggleModal}>
                    <h3><span className="fa fa-pencil fa-lg"></span> Submit Review</h3>
                </Button></div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Review</ModalHeader>
                    <ModalBody>
                     <LocalForm onSubmit={(values) => this.handleSubmit(values)} > 
                      <FormGroup>
                         <Label htmlFor="rating">Rating</Label>
                         <Control.select model=".rating" name="rating" 
                               className="form-control" >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                          </Control.select>
                      </FormGroup>
                      <FormGroup>
                          <Label htmlFor="review">Review</Label>   
                          <Control.textarea model=".review" 
                                 id="review" name="review"
                                 rows="6"
                                 className="form-control" />
                      </FormGroup>
                      <Button type="submit" value="submit" color="primary">Submit</Button>
                     </LocalForm>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }   
}

function RenderReviews({reviews,errMess}) {
    if (errMess === null){
       if (reviews.length){
          return(
            <div className="col-12 col-md-10 m-1">
              <ul className="project-description">
                <h1>REVIEWS</h1>
                {/* <Stagger in> */}
                    {reviews.map((review) => (
                        // <Fade in> 
                            <li key={review.id}>
                                <p>{review.review}</p>
                                <ReactStars count={5} size={24}  value={review.rating} color2={'#ffd700'} edit={false}/>
                                <p>--Author: {review.author}</p>
                                <p>--Posted on: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</p>
                                <br />
                            </li>
                        //</Fade>
                    ))} 
                {/* </Stagger> */}
              </ul>
            </div>
          );
       }
       else{
          return(
            <div className="col-12 col-md-10 m-1">
                <h3>REVIEWS</h3>
                <h5>No Reviews are given for this Newspaper.</h5>
            </div>
          ); 
       }
    }
    else{
      return(
          <div className="col-12 col-md-10 m-1">
            <h5>{errMess}</h5>
          </div>
      ); 
    }
}


function RenderItem({item, addtocart, reviews, postReview,orders}) {

    var sum = 0,avg = 0;
    if (reviews.length){
        sum = reviews.map(review=>review.rating).reduce((r1,r2)=>r1+r2,0);
        avg = sum/reviews.length;
    }

    const history=useHistory();
    if (item != null){
        const IsLogin=()=>{ 
            if(user_real){
                console.log('yes')
                addtocart(item.id)
            }
            else{
                console.log('no')
                history.push("/signup");   
                
            }
        }
        return( 
            <React.Fragment>
            
            <main className="container1">
                <div className="left-column">
                    <img src={baseUrl + item.image} alt={item.name}/>
                </div>

                <div className="right-column">

                    <div className="product-description">
                        <span>{item.name}</span>
                        <h1>{item.name}</h1>
                        <p>{item.description}</p>
                    </div>

                    <div className="product-price">
                        <span>Rs.{item.price}</span>
                        <button class="cart-btn" onClick={IsLogin}>Add to cart</button>
                    </div>
                    <div className='product-description'>
                        <span>Total No. of reviews posted till now: {reviews.length}</span>   
                        <span><ReactStars count={5} size={24}  value={avg} color2={'#ffd700'} edit={false}/></span>
                    </div>
                    <ReviewForm itemId={item.id} postReview={postReview} history={history} orders={orders}/>
                </div>
            </main>
            
            </React.Fragment>
        );
    }
    else{
       return(
           <div></div>
       ); 
    }
}


const Newsdetails = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.paperSelected != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/newspapers">Newspapers</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.paperSelected.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.paperSelected.name}</h3>
                        <hr />
                    </div>                
                </div> 
                <div className="row">
                    <RenderItem addtocart={props.addtocart} item={props.paperSelected} reviews={props.reviews} postReview={props.postReview} orders={props.checkorders}/>
                </div>
                <div className="row">
                    <RenderReviews reviews={props.reviews} errMess={props.reviewsErrMess}/>         
                </div>
            </div>
        );
    }    
}

export default Newsdetails;