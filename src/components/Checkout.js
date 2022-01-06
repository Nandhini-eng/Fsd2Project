import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import {user_real} from "./Login";
import {price,items} from "./Cart";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const Length = (len)=>(val)=>val && (val.length===len);
const isNumber = (val) => !isNaN(Number(val));
class Checkout extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values){
    this.props.postOrder(values.fullName, values.address, values.city, values.postalCode, 
        values.country, values.NameOnCard, values.CreditCardNum, values.ExpMon, values.ExpYear, values.Cvv,
        this.props.cart,user_real,price,items);
    
    this.props.resetCheckoutForm();

  }
  render(){
      console.log((this.props.cart).length)
    return (

    
      <div className="row row-content" style={{backgroundImage:`url("https://w0.peakpx.com/wallpaper/909/359/HD-wallpaper-black-lines-material-design-creative-geometric-shapes-lollipop-lines-black-material-design-strips-geometry-black-backgrounds.jpg")`,paddingLeft:"8%"}}>
      <br />
       <div className="col-12 col-md-11" style={{backgroundColor:"#e3efc8"}}>
           <Form model="order" onSubmit={(values) => this.handleSubmit(values)}>
               <div style={{float:"left", width:"48%"}}>
                   <h3>Shipping Address</h3>
               <Row className="form-group">
                   <Label htmlFor="fullName" md={2} style={{fontWeight:"bold"}}>Full Name</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".fullName" id="fullName" name="fullName"
                           placeholder="Enter full name"
                           className="form-control"
                           validators={{
                               required, minLength: minLength(3)
                           }}
                       /> 
                       <Errors
                           className="text-danger"
                           model=".fullName"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters',
                           }}
                       />   
                   </Col>
               </Row>
               <br />
               <Row className="form-group">
                   <Label htmlFor="address" md={2} style={{fontWeight:"bold"}}>Address</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".address" id="address" name="address"
                           placeholder="Enter address"
                           className="form-control"
                           validators={{
                               required, minLength: minLength(3)
                           }}
                       />  
                       <Errors
                           className="text-danger"
                           model=".address"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters',
                           }}
                       /> 
                   </Col>                        
               </Row>
               <br />
               <Row className="form-group">
               <Label htmlFor="city" md={2} style={{fontWeight:"bold"}}>City</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".city" id="city" name="city"
                           placeholder="Enter city"
                           className="form-control" 
                           validators={{
                               required, minLength: minLength(3)
                           }}
                       />
                       <Errors
                           className="text-danger"
                           model=".city"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters'
                           }}
                       />  
                   </Col>
               </Row>
               <br />
               <Row className="form-group">
                   <Label htmlFor="postalCode" md={2} style={{fontWeight:"bold"}}>Postal Code</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".postalCode" id="postalCode" name="postalCode"
                           placeholder="Enter postalCode"
                           className="form-control"
                           validators={{
                            required, isNumber,Length:Length(6)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".postalCode"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Must be a number',
                            Length:'Must be a 6 digit code'
                        }}
                    />  
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="country" md={2} style={{fontWeight:"bold"}}>Country</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".country" id="country" name="country"
                           placeholder="Enter country"
                           className="form-control"
                           validators={{
                            required, minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".country"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',

                        }}
                       /> 
                   </Col>
               </Row>
               
               <br/>
               </div >
               <div style={{float:"right",width:"50%",paddingLeft:"20px"}}>
                   <h3>Payment Details</h3>
               <Row className="form-group">
                   <Label htmlFor="NameOnCard" md={2} style={{fontWeight:"bold"}}>Name On Card</Label>
                   <Col md={10} style={{borderRadius:"4px"}}>
                       <Control.text model=".NameOnCard" id="NameOnCard" name="NameOnCard"
                           placeholder="Enter Name On Card"
                           className="form-control"
                           validators={{
                            required, minLength: minLength(3)
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".NameOnCard"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 2 characters',
                            
                        }}
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="CreditCardNum" md={2} style={{fontWeight:"bold"}}>Credit Card Number</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".CreditCardNum" id="CreditCardNum" name="CreditCardNum"
                           placeholder="Enter Credit Card Number"
                           className="form-control"
                           validators={{
                            required, Length:Length(16), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".CreditCardNum"
                        show="touched"
                        messages={{
                            required: 'Required',
                            Length:'Must be a 16 digits number',
                            isNumber: 'Must be a number'
                        }}
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="ExpMon" md={2} style={{fontWeight:"bold"}}>Expiry Month</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".ExpMon" id="ExpMon" name="ExpMon"
                           placeholder="Enter Expiry Month"
                           className="form-control"
                           validators={{
                            required, minLength: minLength(1), maxLength: maxLength(2), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".ExpMon"
                        show="touched"
                        messages={{
                            required: 'Required',
                            minLength: 'Must be greater than 1 number',
                            maxLength: 'Must be 2 numbers or less',
                            isNumber: 'Must be a number'
                        }}
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="ExpYear" md={2} style={{fontWeight:"bold"}}>Expiry Year</Label>
                   <Col md={10} style={{  borderRadius:"4px"}}>
                       <Control.text model=".ExpYear" id="ExpYear" name="ExpYear"
                           placeholder="Enter Expiry Year"
                           className="form-control"
                           validators={{
                            required, Length:Length(4), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".ExpYear"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Must be a number',
                            Length:'Must be a 4 digit number'
                        }}
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="Cvv" md={2} style={{fontWeight:"bold"}}>CVV</Label>
                   <Col md={10} style={{ borderRadius:"4px"}}>
                       <Control.text model=".Cvv" id="Cvv" name="Cvv"
                           placeholder="Enter CVV"
                           className="form-control"
                           validators={{
                            required, Length:Length(3), isNumber
                        }}
                    />
                    <Errors
                        className="text-danger"
                        model=".Cvv"
                        show="touched"
                        messages={{
                            required: 'Required',
                            isNumber: 'Must be a number',
                            Length:'Must be a 3 digit number'
                        }}
                       /> 
                   </Col>
               </Row>
               <br />
               </div>
               <Row >
                   <Col md={{size: 10, offset: 5}}>
                       <Button type="submit" color="primary">
                          Place Subscription
                       </Button>
                   </Col>
               </Row>
               <br />
               
           </Form>
        </div>
        

  
  </div>
  );
}
}

export default Checkout;