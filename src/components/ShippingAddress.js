import React, { Component } from 'react';
import { Button, Label, Col, Row } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import {user_real} from "./Login";
import {price,items} from "./Cart";
class ShippingAddress extends Component {
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

    
      <div className="row row-content" style={{backgroundColor:"lightgray"}}>
      <div className="col-12">
         <h3>Shipping and Payment</h3>
      </div>
      <br />
       <div className="col-12 col-md-9">
           <Form model="order" onSubmit={(values) => this.handleSubmit(values)}>
               <Row className="form-group">
                   <Label htmlFor="fullName" md={2} style={{fontWeight:"bold"}}>Full Name</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".fullName" id="fullName" name="fullName"
                           placeholder="Enter full name"
                           className="form-control"
                          //  validators={{
                          //      required, minLength: minLength(3), maxLength: maxLength(15)
                          //  }}
                       /> 
                       {/* <Errors
                           className="text-danger"
                           model=".firstname"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters',
                               maxLength: 'Must be 15 characters or less'
                           }}
                       />    */}
                   </Col>
               </Row>
               <br />
               <Row className="form-group">
                   <Label htmlFor="address" md={2} style={{fontWeight:"bold"}}>Address</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".address" id="address" name="address"
                           placeholder="Enter address"
                           className="form-control"
                          //  validators={{
                          //      required, minLength: minLength(3), maxLength: maxLength(15)
                          //  }}
                       />  
                       {/* <Errors
                           className="text-danger"
                           model=".lastname"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 characters',
                               maxLength: 'Must be 15 characters or less'
                           }}
                       />  */}
                   </Col>                        
               </Row>
               <br />
               <Row className="form-group">
               <Label htmlFor="city" md={2} style={{fontWeight:"bold"}}>City</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".city" id="city" name="city"
                           placeholder="Enter city"
                           className="form-control" 
                          //  validators={{
                          //      required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                          //  }}
                       />
                       {/* <Errors
                           className="text-danger"
                           model=".telnum"
                           show="touched"
                           messages={{
                               required: 'Required',
                               minLength: 'Must be greater than 2 numbers',
                               maxLength: 'Must be 15 numbers or less',
                               isNumber: 'Must be a number'
                           }}
                       />   */}
                   </Col>
               </Row>
               <br />
               <Row className="form-group">
                   <Label htmlFor="postalCode" md={2} style={{fontWeight:"bold"}}>Postal Code</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".postalCode" id="postalCode" name="postalCode"
                           placeholder="Enter postalCode"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="country" md={2} style={{fontWeight:"bold"}}>Country</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".country" id="country" name="country"
                           placeholder="Enter country"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="NameOnCard" md={2} style={{fontWeight:"bold"}}>Name On Card</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".NameOnCard" id="NameOnCard" name="NameOnCard"
                           placeholder="Enter Name On Card"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="CreditCardNum" md={2} style={{fontWeight:"bold"}}>Credit Card Number</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".CreditCardNum" id="CreditCardNum" name="CreditCardNum"
                           placeholder="Enter Credit Card Number"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="ExpMon" md={2} style={{fontWeight:"bold"}}>Expiry Month</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".ExpMon" id="ExpMon" name="ExpMon"
                           placeholder="Enter Expiry Month"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="ExpYear" md={2} style={{fontWeight:"bold"}}>Expiry Year</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".ExpYear" id="ExpYear" name="ExpYear"
                           placeholder="Enter Expiry Year"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br/>
               <Row className="form-group">
                   <Label htmlFor="Cvv" md={2} style={{fontWeight:"bold"}}>CVV</Label>
                   <Col md={10} style={{  border: "1px solid #ccc",borderRadius:"4px"}}>
                       <Control.text model=".Cvv" id="Cvv" name="Cvv"
                           placeholder="Enter CVV"
                           className="form-control"
                       /> 
                   </Col>
               </Row>
               <br />
               <Row className="form-group">
                   <Col md={{size: 10, offset: 2}}>
                       <Button type="submit" color="primary">
                          Place Order
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

export default ShippingAddress;