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
    // let count=0
    // let x=this.props.cart.map(item=>count+=item.qty)
    // console.log(x[1])

    // console.log(Cartval(this.props.cart))

    console.log(user_real)
    if (user_real) {
      console.log('Loggedin')
      isLoggedin =
        <Link to='/myaccount'>
          <Button style={{ color: 'rgba(255,255,255,.55)' }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Logout
          </Button>
        </Link>
    }
    else {
      console.log('Not logged in')
      isLoggedin =
        <Link to='/signup'>
          <Button style={{ color: 'rgba(255,255,255,.55)' }} onMouseOver={this.back} onMouseOut={this.back1}>
            <span className="fa fa-sign-in fa-lg"></span> Signup
          </Button>
        </Link>
    }

    return (
      <React.Fragment>
        <Navbar dark expand="md" style={{ backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/636/636/890/line-strip-grey-background-wallpaper-preview.jpg")` }}>
          <div className="container" style={{ color: "white" }} >
            <NavbarToggler onClick={this.toggleNav} />
            {/* <NavbarBrand className="mr-auto" href="/">
                  <img src='assets/images/logo.png' height="50" width="50" alt='Newspapers and Magazines' />
                </NavbarBrand> */}
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem className="mr-auto" >
                  <NavLink className="nav-link" to='/home'>
                    <img src='assets/images/logo.png' height="30" width="30" alt='Newspapers and Magazines' />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/home'>
                    <span className="fa fa-home fa-lg" ></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/newspapers' >
                    <span className="fa fa-newspaper-o fa-lg"></span> Newspapers
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/magazines'>
                    <span className="fa fa-book fa-lg"></span> Magazines
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/myaccount'>
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
                  <NavLink className="nav-link" to='/orders'>
                    <span className="fa fa-shopping-bag fa-lg"></span> My Orders

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink className="nav-link" to='/searchc'>

                    Click here to Search

                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/cart'>
                    <span className="fa fa-shopping-cart fa-lg"></span> Cart

                  </NavLink>

                </NavItem>
                <NavItem><Cartval /></NavItem>
                <NavItem>
                  <NavLink className="nav-link" to='/blog'>
                    <span className="fa fa-commenting-o fa-lg"></span> Blog
                  </NavLink>
                </NavItem>

              </Nav>
              <Nav className='ms-auto' navbar>

                <NavItem>
                  {isLoggedin}
                </NavItem>





              </Nav>

            </Collapse>
          </div>
        </Navbar>

        {/* green:#AFD275 */}
        {/* style={{backgroundColor:"#a2e8d0"}} greenish blue*/}
        {/* <div className="bg" style={{backgroundColor:"#e7717d"}} > */}
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




export default Header;
