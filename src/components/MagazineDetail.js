import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody, Label, FormGroup
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { user_real } from './Login'
//import { FadeTransform, Fade, Stagger } from 'react-animation-components';

class ReviewForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        if (user_real) {
            console.log('validated user');
            let cartItems = []
            cartItems = this.props.orders.map((order) => order.cart.map((item) => (item.id)))
            let flag = cartItems.some((value) => value.some((id) => (id === this.props.itemId)))
            if (flag) {
                this.setState({
                    isModalOpen: !this.state.isModalOpen
                })
            }
            else{
                alert("You cannot submit review as you have not subscribed this item!!")
            };

        }
        else {
            console.log('invalid user');
            this.props.history.push('/signup');
        }
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postReview(this.props.itemId, parseInt(values.rating), user_real, values.review);
    }

    render() {
        return (
            <React.Fragment>
                <div className="col-12 col-md-7 m-1">

                    <Button outline onClick={this.toggleModal}>
                        <h3><span className="fa fa-pencil fa-lg"></span>Submit Review</h3>
                    </Button></div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Review</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
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

function RenderReviews({ reviews, errMess }) {
    if (errMess === null) {
        if (reviews.length) {
            return (
                <div className="col-12 col-md-10 m-1">
                    <ul className="list-unstyled">
                        <h3>REVIEWS</h3>
                        {/* <Stagger in> */}
                        {reviews.map((review) => (
                            // <Fade in> 
                            <li key={review.id}>
                                <h6>{review.review}</h6>
                                <h6>--Rating: {review.rating}</h6>
                                <h6>--Author: {review.author}</h6>
                                <h6>--Posted on: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(review.date)))}</h6>
                                <br />
                            </li>
                            //</Fade>
                        ))}
                        {/* </Stagger> */}
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div className="col-12 col-md-10 m-1">
                    <h3>REVIEWS</h3>
                    <h5>No Reviews are given for this Magazine.</h5>
                </div>
            );
        }
    }
    else {
        return (
            <div className="col-12 col-md-10 m-1">
                <h5>{errMess}</h5>
            </div>
        );
    }
}


function RenderItem({ item, addtocart, reviews, postReview, orders }) {

    var sum = 0, avg = 0;
    if (reviews.length) {
        sum = reviews.map(review => review.rating).reduce((r1, r2) => r1 + r2, 0);
        avg = sum / reviews.length;
    }

    const history = useHistory();
    if (item != null) {
        const IsLogin = () => {
            if (user_real) {
                console.log('yes')
                addtocart(item.id)
            }
            else {
                console.log('no')
                history.push("/signup");
            }
        }
        return (
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    {/* <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}> */}
                    <Card>
                        <CardImg width="100%" height="600px" src={baseUrl + item.image} alt={item.name} />
                        <CardBody>
                            <CardTitle><h2>{item.name}</h2></CardTitle>
                            <CardSubtitle><h3>{item.category}</h3></CardSubtitle>
                            <CardText><h4>Price: Rs.{item.price}</h4></CardText>
                        </CardBody>
                    </Card>
                    {/* </FadeTransform>   */}
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h3>Description</h3><br />
                    <h5>{item.description}</h5><br /><br />
                    {/* <button onClick={x}><h4>Subscribe</h4></button>  */}
                    <button onClick={IsLogin}><h4>Subscribe</h4></button>

                    <br />
                    <br />
                    <br />
                    <h5>Total No. of reviews posted till now: {reviews.length}</h5>
                    <h5>Average Rating: {avg} / 5</h5>
                    <br />
                    <ReviewForm itemId={item.id} postReview={postReview} history={history} orders={orders} />

                </div>
            </React.Fragment>
        );
    }
    else {
        return (
            <div></div>
        );
    }
}


const MagazineDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.magSelected != null) {
        return (
            <div className='magde'>
            <div className="container">
                <div className="row">
                    <Breadcrumb style={{fontSize:"20px"}}>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/magazines">Magazines</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.magSelected.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.magSelected.name}</h3>
                        <hr />
                    </div>                
                </div> 
                <div className="row">
                    <RenderItem item={props.magSelected} addtocart={props.addtocart} reviews={props.reviews} postReview={props.postReview} orders={props.checkorders}/>
                </div>
                <div className="row">
                    <RenderReviews reviews={props.reviews} errMess={props.reviewsErrMess}/>  
                </div>
                </div>
            </div>
        );
    }
}

export default MagazineDetail;