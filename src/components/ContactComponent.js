import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postFeedback(values.firstname,values.lastname,values.telnum,values.email,values.agree,values.contactType,values.message);
        this.props.resetFeedbackForm();
    }

    render() {

        return(
            <div style={{color:"white",backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`}}>
            <div className="container" style={{color:"white",backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`}}>
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3 style={{color:"white"}}>Contact Us</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3 style={{color:"white"}}>Location Information</h3>
                    </div>
                    <Row>
                    <Col md={5}>
                    {/* <div className="col-12 col-sm-4 offset-sm-1"> */}
                            <h5 style={{color:"white"}}>Our Address</h5>
                            <address style={{color:"white"}}>
                            Srini Avenue<br />
                            Kompally, Hyderabad<br />
                            INDIA<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:newspapersandmagazines@news.net">newspapersandmagazines@news.net</a>
                            </address>
                    {/* </div>
                    <div className="col-12 col-sm-11 offset-sm-1"> */}
                       <br></br>
                       <br></br>
                        <div className="btn-group" role="group">
                            
    
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:newspapersandmagazines@news.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    
                    </Col>
                    <Col md={6}>

                    
                    
                    {/* <div className="col-12 col-sm-6 offset-sm-1" style={{float:'right'}}> */}
                        {/* <img src="https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000__480.jpg" alt="contact us" style={{width:"70%",height:"100%",paddingLeft:"80px"}}></img>
                     */}
                    {/* </div> */}
                    </Col>
                    </Row>
                    
                </div>

                <div className="row row-content" style={{backgroundColor:"lightgray",color:"black"}}>
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                   <br />
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2} style={{fontWeight:"bold"}}>First Name</Label>
                                <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    /> 
                                    <Errors
                                        className="text-danger"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />   
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2} style={{fontWeight:"bold"}}>Last Name</Label>
                                <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />  
                                    <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    /> 
                                </Col>                        
                            </Row>
                            <br />
                            <Row className="form-group">
                            <Label htmlFor="telnum" md={2} style={{fontWeight:"bold"}}>Contact Tel.</Label>
                                <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 numbers',
                                            maxLength: 'Must be 15 numbers or less',
                                            isNumber: 'Must be a number'
                                        }}
                                    />  
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Label htmlFor="email" md={2} style={{fontWeight:"bold"}}>Email</Label>
                                <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email"
                                        className="form-control"
                                        validators={{
                                            required, validEmail
                                        }}
                                    /> 
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                    />     
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                                name="agree"
                                                className="form-check-input" 
                                                 /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                            className="form-control">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Label htmlFor="message" md={2} style={{fontWeight:"bold"}}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12"
                                         className="form-control" />
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                        </Form>
                    </div>
               </div>
               <br></br>
            </div>
            </div>
        );
    }
}

export default Contact;