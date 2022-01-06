import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from 'reactstrap';
import { Link, Redirect} from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Signup extends Component {

    constructor(props){
        super(props);
       var k=props.regusers
       
       console.log(k.regusers)
        this.handleSubmit = this.handleSubmit.bind(this);
        
        console.log('hello')
    }
    
    handleSubmit(values) {
       
        console.log('Current State is: ' + JSON.stringify(values));
        //console.log('bye')
        this.props.postsignup(values.username,values.password);
        this.props.history.push('login')

        this.props.resetFeedbackForm();
        
        
        
    }

    render() {

        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Sign Up</BreadcrumbItem>
                        
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Signup</h3>
                        <hr />
                    </div>                
                </div>
               
                <div style={{paddingLeft:"300px", paddingTop:"50px",paddingBottom:'80px',paddingRight:'200px'}}>
                <div className="row row-content" style={{borderRadius:'14px',backgroundColor:"lightgray", backgroundImage:`url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbsuZyeDpx443ed5YF8MprRLcCOwDY5LXM9A&usqp=CAU')`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
                   <div className="col-12">
                      <h2 style={{color:"#636303"}}>Register here </h2>
                      <ul style={{fontFamily:"Footlight MT Light", color:"#6b0947", fontWeight:"bolder",fontSize:"20px"}}>
                          <li>User Name must be greater than 2 letters and less than 15 characters</li>
                          <li>Password must be greater than 2 letters and less than 10 characters</li>
                        </ul>
                      
                      
                   </div>
                   
                    <div className="col-12 col-md-10" style={{fontFamily:"cursive",fontSize:"20px"}}>
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" style={{fontFamily:"Sitka Heading",fontWeight:"bold",fontSize:"25px",color:"#031d63"}}>Username</Label>
                                <Col md={8} style={{borderRadius:"4px"}}>
                                    <Control.text model=".username" id="username" name="username"
                                        placeholder="User Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    /> 
                                    <Errors style={{fontSize:"18px", fontFamily:"gadugi",fontWeight:"900",color:"#f71505"}}
                                        
                                        model=".username"
                                        show="touched"
                                        messages={{
                                            required: 'Required,',
                                            minLength: ' Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />   
                                </Col>
                            </Row>
                            <br/>
                            <Row className="form-group">
                                <Label htmlFor="password"  style={{fontFamily:"Sitka Heading",fontWeight:"bold",fontSize:"25px",color:"#031d63"}}>Password</Label>
                                <Col md={8} style={{  borderRadius:"4px"}}>
                                    <Control.text model=".password" id="password" name="password"
                                        placeholder="Password"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(10)
                                        }}
                                    />  
                                    <Errors style={{fontSize:"18px", fontFamily:"gadugi",fontWeight:"900",color:"#f71505"}}
                                        
                                        model=".password"
                                        show="touched"
                                        messages={{
                                            required: 'Required,',
                                            minLength: '  Must be greater than 2 characters',
                                            maxLength: 'Must be 10 characters or less'
                                        }}
                                    /> 
                                </Col>                        
                            </Row>
                            <br/>
                            <Row className="form-group">
                                <Col md={{size: 10}} >
                                    <Button type="submit" color="primary" style={{backgroundColor:"saddlebrown",border:"none",color:"whitesmoke"}}>
                                        SignUp
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                            <Row className="form-group">
                                <Col md={{size: 10}} style={{ color:"#035203",fontFamily:"Corbel",fontWeight:"bolder",fontSize:"24px"}}>
                                    <span>If existing user click   </span>   
                                
                                    <Link to="/login" style={{color:"#109e10"}}>
                                                here to Login
                                    </Link>
                                </Col>
                            </Row>
                            <br/>
                        </Form>
                    </div>
               </div>
               </div>
               <br></br>
            </div>
        );
    }
}
//console.log(abc)
export default Signup;
