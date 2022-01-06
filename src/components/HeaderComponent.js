import React, { Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,  Button } from 'reactstrap';
import { NavLink,Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Cartval from './Cartval';
import {user_real} from './Login'
let isLoggedin
class Header extends Component{
  
    constructor(props){
  
        super(props);

        this.state = {
          
            isNavOpen: false,
            cartCount:0,
            // cartCount:this.props.cart.forEach((item)=>{count+=item.qty}),
            
        };

        this.toggleNav = this.toggleNav.bind(this);
      
    }

    toggleNav(){
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
    }
    back(e)
    {
      e.target.style.color = 'white'
    }
    back1(e)
    {
      e.target.style.color = 'rgba(255,255,255,.55)'
    }
    render() {
      // let count=0
      // let x=this.props.cart.map(item=>count+=item.qty)
      // console.log(x[1])
       
      // console.log(Cartval(this.props.cart))
        
        console.log(user_real)
        if(user_real){
          console.log('Loggedin')
        }
        else{
          console.log('Not logged in')
        }
        if(user_real){
          isLoggedin=
          <Link to='/myaccount'>
                          <Button  style={{color:'rgba(255,255,255,.55)'}}  onMouseOver={this.back} onMouseOut={this.back1}>
                            <span className="fa fa-sign-in fa-lg"></span> Logout
                          </Button>
          </Link>
        }
        else{
          isLoggedin=
          <Link to='/signup'>
                          <Button  style={{color:'rgba(255,255,255,.55)'}}  onMouseOver={this.back} onMouseOut={this.back1}>
                            <span className="fa fa-sign-in fa-lg"></span> Signup
                          </Button>
                        </Link>
        }
      
    
        return(
          <React.Fragment>
            <Navbar dark expand="md">
              <div className="container">
                <NavbarToggler onClick={this.toggleNav} />
                <Link to='/home'>
                <NavbarBrand className="mr-auto" >
                  <img src='assets/images/logo.png' height="50" width="50" alt='Newspapers and Magazines' />
                </NavbarBrand>
                </Link>
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
                      <NavLink className="nav-link" to='/cart'>
                    <span className="fa fa-key fa-lg"></span> cart 
                  
                    </NavLink>
                    </NavItem>
                    <NavItem><Cartval/></NavItem>
                   </Nav>
                   <Nav className='ms-auto' navbar>
                    
                      <NavItem>
                        {isLoggedin}
                      </NavItem>
                    
                   </Nav>
                </Collapse>
              </div>
            </Navbar>

            <div className="bg">
             <div className="container">
                 <div className="row row-header">
                     <div className="col-12 col-sm-6" >
                         <h1>Newspapers and Magazines</h1>
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