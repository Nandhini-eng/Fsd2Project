import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cartval from './Cartval.js';
import { getproducts } from '../redux/ActionCreators';
import LightSpeed from 'react-reveal/LightSpeed';
import { user_real } from './Login'
let isLoggedin

class Header extends Component {

  constructor(props) {

    super(props);
    this.state = {
      isNavOpen: false,
      SearchField: "e "
    };
    this.toggleNav = this.toggleNav.bind(this);
  }
  //Handling nav bar toogle mode 
  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  back(e) {
    e.target.style.color = 'white'
  }
  back1(e) {
    e.target.style.color = 'rgba(255,255,255,.55)'
  }
  render() {
    //If user is logged in, Logout button is displayed and linked appropriately
    if (user_real) {
      isLoggedin =
        <Link to='/myaccount'>
          <Button style={{ color: 'rgba(255,255,255,.55)' }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Logout
          </Button>
        </Link>
    }
    //If user is not logged in, Signup button is displayed and linked appropriately
    else {
      isLoggedin =
        <Link to='/signup'>
          <Button style={{ color: 'rgba(255,255,255,.55)' }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Signup
          </Button>
        </Link>
    }

    return (
      //Nav bar which links various nav items to their respective pages
      <React.Fragment>
        <Navbar dark expand="md" style={{ backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/636/636/890/line-strip-grey-background-wallpaper-preview.jpg")` }}>
          <div className="container-xl" style={{ color: "white" }} >
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                {/* logo */}
                <NavItem className="mr-auto" href="/">
                  <img src='assets/images/logo.png' height="30" width="30" alt='Newspapers and Magazines' />
                </NavItem>
                {/* Home */}
                <NavItem>
                  <NavLink className="nav-link" to='/home'>
                    <span className="fa fa-home fa-lg" ></span> Home
                  </NavLink>
                </NavItem>
                {/* Newspapers */}
                <NavItem>
                  <NavLink className="nav-link" to='/newspapers' >
                    <span className="fa fa-newspaper-o fa-lg"></span> Newspapers
                  </NavLink>
                </NavItem>
                {/* Magazines */}
                <NavItem>
                  <NavLink className="nav-link" to='/magazines'>
                    <span className="fa fa-book fa-lg"></span> Magazines
                  </NavLink>
                </NavItem>
                {/* Account */}
                <NavItem>
                  <NavLink className="nav-link" to='/myaccount'>
                    <span className="fa fa-user fa-lg"></span> My Account
                  </NavLink>
                </NavItem>
                {/* About us page */}
                <NavItem>
                  <NavLink className="nav-link" to='/aboutus'>
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                {/* Contact us page */}
                <NavItem>
                  <NavLink className="nav-link" to='/contactus'>
                    <span className="fa fa-address-card fa-lg"></span> Contact Us
                  </NavLink>
                </NavItem>
                {/* Orders */}
                <NavItem>
                  <NavLink className="nav-link" to='/orders'>
                    <span className="fa fa-shopping-bag fa-lg"></span> My Orders
                  </NavLink>
                </NavItem>
                {/* Search page */}
                <NavItem>
                  <NavLink className="nav-link" to='/searchc'>
                    Click here to Search
                  </NavLink>
                </NavItem>
                {/* Subscribed items */}
                <NavItem>
                  <NavLink className="nav-link" to='/cart'>
                    <span className="fa fa-shopping-cart fa-lg"></span> Cart
                  </NavLink>
                </NavItem>
                <NavItem><Cartval /></NavItem>
              </Nav>
              {/* Signup or Logout */}
              <Nav className='ms-auto' navbar>
                <NavItem>
                  {isLoggedin}
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        {/* Small description about our app */}
        <div className="hdr">
          <div className="container" >
            <div className="row row-header">
              <LightSpeed>
                <div className="col-12 col-sm-6" >
                  <h1 style={{ color: "black" }}>Newspapers and Magazines</h1>
                  <p style={{ color: "black" }}>We provide various Newspapers and Magazines in this application. Users can subscribe and purchase their favourite newspapers and magazines and enjoy the joy of reading! </p>
                </div>
              </LightSpeed>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

//Mapping state to props to use required state value 
const mapStateToProps = (state) => {
  return {
    newspapers: state.newspapers,
    magazines: state.magazines,
    items: state.cartReducer.items,
  };
};
//Mapping dispatch to props to dispatch required functions
const mapDispatchToProps = (dispatch) => {
  return {
    getproducts: (newspapers, magazines) => { dispatch(getproducts(newspapers, magazines)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
