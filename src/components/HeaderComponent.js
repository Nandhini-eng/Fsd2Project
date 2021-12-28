import React, { Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,  Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import Cartval from './Cartval';



class Header extends Component{
  
    constructor(props){
  
        super(props);

        this.state = {
          
            isNavOpen: false,
            cartCount:0,
            
        };

        this.toggleNav = this.toggleNav.bind(this);
      
    }

    toggleNav(){
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }

    

    render() {
    
        return(
          <React.Fragment>
            <Navbar dark expand="md">
              <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <NavbarBrand className="mr-auto" href="/">
                  <img src='assets/images/logo.png' height="50" width="50" alt='Newspapers and Magazines' />
                </NavbarBrand>
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                    <NavItem>
                      <NavLink className="nav-link"  to='/home'>
                        <span className="fa fa-home fa-lg"></span> Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/newspapers'>
                        <span className="fa fa-newspaper-o fa-lg"></span> Newspapers
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/magazines'>
                        <span className="fa fa-book fa-lg"></span> Magazines
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/myaccount'>
                        <span className="fa fa-user fa-lg"></span> My Account
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/aboutus'>
                        <span className="fa fa-info fa-lg"></span> About Us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/contactus'>
                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink  className="nav-link" to='/login'>
                        <span className="fa fa-key fa-lg"></span> Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/cart'>
                    <span className="fa fa-key fa-lg"></span> cart 
                  
                    </NavLink>
                    </NavItem>
                    <NavItem><Cartval/></NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/orders'>
                    <span className="fa fa-key fa-lg"></span> My Orders 
                  
                    </NavLink>
                    </NavItem>
                    
                   </Nav>
                </Collapse>
              </div>
            </Navbar>

            <div className="bg">
             <div className="container">
                 <div className="row row-header">
                     <div className="col-12 col-sm-6" style={{color:"black"}}>
                         <h1 style={{color:"white"}}>Newspapers and Magazines</h1>
                         <p>We provide various Newspapers and Magazines in this application. Users can subscribe and purchase their favourite newspapers and magazines and enjoy the joy of reading! </p>
                     </div>
                 </div>
             </div>
            </div>
          </React.Fragment>
        );
    }
}


const mapStateToProps=state=>{
  return{
    cart:state.cartReducer.cart
  }
}

export default connect(mapStateToProps)(Header);