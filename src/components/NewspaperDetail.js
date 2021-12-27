import React,{ Component } from 'react';
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalHeader, ModalBody, Label, FormGroup } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {user}  from './Login'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


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
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postReview(this.props.itemId, values.rating, values.author, values.review);
    }

    render() {
        return(
            <React.Fragment>
                <div className="col-12 col-md-7 m-1">
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Review
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
                          <Label htmlFor="yourname">Author</Label>
                          <Control.text model=".author" 
                                 id="author" name="author" 
                                 placeholder="Your Name"
                                 className="form-control"
                                 validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                 }}
                            />
                           <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />    
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

                {/* <div className="col-12 col-md-5 m-1">
                <RenderReviews reviews={this.props.reviews}
                            // postReview={this.props.postReview}
                            // itemId={this.props.itemId} 
                 /> </div> */}

            </React.Fragment>
        );
    }
    
}

function RenderReviews({reviews, postReview, itemId}) {
    if (reviews.length){
        return(
            <div className="col-12 col-md-5 m-1">
               <ul className="list-unstyled">
                 <h3>Reviews</h3>
                  {/* <Stagger in> */}
                    {reviews.map((review) => (
                        // <Fade in> 
                            <li key={review.id}>
                                <h6>{review.review}</h6>
                                <p>--{review.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(review.date)))}</p>
                            </li>
                        //</Fade>
                    ))} 
                  {/* </Stagger> */}
                </ul>
                <br />
                <br />
                <ReviewForm itemId={itemId} postReview={postReview} /> 
            </div>
        );
    }
    else{
        return(
            <div className="col-12 col-md-5 m-1">
                <h3>REVIEWS</h3>
                <h5>No Reviews are given for this Newspaper.</h5>
                <br />
                <br />
                <ReviewForm itemId={itemId} postReview={postReview} /> 
            </div>
        ); 
    }
}

function RenderItem({item}) {
    const history=useHistory();
    if (item != null){
        const IsLogin=()=>{ 
            if(user){
                console.log('yes')
            }
            else{
                console.log('no')
                history.push("/login");    
            }
        }
        return( 
            <React.Fragment>
            
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" height="600 px" src={baseUrl + item.image} alt={item.name} />
                        <CardBody>
                            <CardTitle><h2>{item.name}</h2></CardTitle>
                            <CardText><h4>Price: Rs.{item.price}</h4></CardText>
                        </CardBody>
                    </Card>   
                {/* </div>
    
                <div className="col-12 col-md-5 m-1"> */}
                    <h3>Description</h3><br />
                    <h5>{item.description}</h5><br /><br />
                    <button onClick={IsLogin}><h4>Subscribe</h4></button>
                </div>
            
            </React.Fragment>
        );
    }
    else{
       return(
           <div></div>
       ); 
    }
}

const NewspaperDetail = (props) => {

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
                    <RenderItem item={props.paperSelected} />             
                {/* </div>
                <div className="row"> */}
                    <RenderReviews reviews={props.reviews}
                                postReview={props.postReview}
                                itemId={props.paperSelected.id} 
                    />  
                  
                    {/*<ReviewForm itemId={props.paperSelected.id} postReview={props.postReview} /> */}
                </div>
            </div>
        );
    }    
}

export default NewspaperDetail;