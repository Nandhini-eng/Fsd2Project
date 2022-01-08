import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Button } from 'reactstrap';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cartval from './Cartval.js';
import { getproducts } from '../redux/ActionCreators';

import LightSpeed from 'react-reveal/LightSpeed';
import Searchc from './Searchc.js';
import { user_real } from './Login';
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
      console.log("Logged in")
      isLoggedin =
        <Link to='/myaccount'>
          <Button style={{ color: 'rgba(255,255,255,.55)', backgroundColor: "#d61919" }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Logout
          </Button>
        </Link>
    }
    //If user is not logged in, Signup button is displayed and linked appropriately
    else {
      console.log('Not logged in')
      isLoggedin =
        <Link to='/signup'>
          <Button style={{ color: 'rgba(255,255,255,.55)', backgroundColor: "#5112cd" }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Signup
          </Button>
        </Link>
    }

    //Nav bar which links various nav items to their respective pages
    return (
      <React.Fragment>
        <Navbar dark expand="md" style={{ backgroundImage: `url("https://i.pinimg.com/originals/37/7d/a5/377da5849f93a6f8594fd07933e832fa.png")` }}>
          <div className="container" style={{ color: "white", marginLeft: "30px", marginRight: "10px", maxWidth: "1300px" }} >
            <NavbarToggler onClick={this.toggleNav} />
            <Collapse isOpen={this.state.isNavOpen} navbar>

              <Nav navbar>
                {/* Logo of our app */}
                <NavItem className="mr-auto" href="/" style={{ paddingLeft: "2px" }}>
                  <img src='assets/images/logo.png' height="45" width="45" alt='Newspapers and Magazines' />
                </NavItem>
                {/* Home */}
                <NavItem>
                  <NavLink className="nav-link" to='/home'>
                    <h5><span className="fa fa-home fa-lg" ></span> Home</h5>
                  </NavLink>
                </NavItem>
                {/* Newspapers */}
                <NavItem>
                  <NavLink className="nav-link" to='/newspapers' >
                    <h5><span className="fa fa-newspaper-o fa-lg"></span> Newspapers </h5>
                  </NavLink>
                </NavItem>
                {/* Magazines */}
                <NavItem>
                  <NavLink className="nav-link" to='/magazines'>
                    <h5><span className="fa fa-book fa-lg"></span> Magazines </h5>
                  </NavLink>
                </NavItem>
                {/* Account page */}
                <NavItem>
                  <NavLink className="nav-link" to='/myaccount'>
                    <h5><span className="fa fa-user fa-lg"></span> My Account </h5>
                  </NavLink>
                </NavItem>
                {/* About us page */}
                <NavItem>
                  <NavLink className="nav-link" to='/aboutus'>
                    <h5><span className="fa fa-info fa-lg"></span> About Us </h5>
                  </NavLink>
                </NavItem>
                {/* Contact us page */}
                <NavItem>
                  <NavLink className="nav-link" to='/contactus'>
                    <h5><span className="fa fa-address-card fa-lg"></span> Contact Us </h5>
                  </NavLink>
                </NavItem>
                {/* Orders */}
                <NavItem>
                  <NavLink className="nav-link" to='/orders'>
                    <h5><span className="fa fa-shopping-bag fa-lg"></span> My Orders </h5>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/blog'>
                    <h5><span className="fa fa-commenting-o fa-lg"></span> Blog</h5>
                  </NavLink>
                </NavItem>
                {/* Search page */}
                <NavItem>
                  <NavLink className="nav-link" to='/searchc'>
                    <h5>Click here to Search <span className="fa fa-search"></span></h5>
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className='ms-auto' navbar >
                {/* Signup or Logout */}
                <NavItem>
                  {isLoggedin}
                </NavItem>
                {/* Cart page */}
                <NavItem>
                  <NavLink className="nav-link" to='/cart'>
                    <h5 style={{ paddingLeft: "5px" }}>Cart <span className="fa fa-shopping-cart fa-lg"></span> </h5>
                  </NavLink>
                </NavItem>
                <NavItem><Cartval /></NavItem>
              </Nav>

            </Collapse>
          </div>
        </Navbar>
        {/* Small description about our app */}
        <div className="hdr">
          <div className="container" >
            <div className="row row-header">
              <LightSpeed>
                <div className="col-12 col-sm-7" >
                  <h1>Newspapers and Magazines</h1>
                  <p>We provide various useful Newspapers and Magazines in this application. Users can subscribe and purchase their favourite newspapers and magazines to learn several new things and enjoy the joy of reading! </p>
                </div>
              </LightSpeed>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
