import React, { Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,  Button } from 'reactstrap';
import { NavLink,Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Cartval from './Cartval.js';
import {getproducts} from '../redux/ActionCreators';

import LightSpeed from 'react-reveal/LightSpeed';
import Jump from 'react-reveal/Jump';

import Searchc from './Searchc.js';
import {user_real} from './Login'
let isLoggedin
class Header extends Component{
  
    constructor(props){
  
        super(props);

        this.state = {
          
            isNavOpen: false,
            SearchField:"e "
            
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
            <Navbar dark expand="md" style={{ backgroundImage: `url("https://c4.wallpaperflare.com/wallpaper/636/636/890/line-strip-grey-background-wallpaper-preview.jpg")`}}>
              <div className="container" style={{color:"white",marginLeft:"30px",marginRight:"10px"}} >
                <NavbarToggler onClick={this.toggleNav} />
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  
                  <Nav navbar>
                    <NavItem className="mr-auto" href="/" style={{paddingLeft:"2px"}}>
                      <img src='assets/images/logo.png' height="45" width="45" alt='Newspapers and Magazines' />
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/home'>
                      <h5><span className="fa fa-home fa-lg" ></span> Home</h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/newspapers' >
                      <h5><span className="fa fa-newspaper-o fa-lg"></span> Newspapers </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/magazines'>
                        <h5><span className="fa fa-book fa-lg"></span> Magazines </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/myaccount'>
                        <h5><span className="fa fa-user fa-lg"></span> My Account </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/aboutus'>
                        <h5><span className="fa fa-info fa-lg"></span> About Us </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/contactus'>
                        <h5><span className="fa fa-address-card fa-lg"></span> Contact Us </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link" to='/orders'>
                        <h5><span className="fa fa-shopping-bag fa-lg"></span> My Orders </h5>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to='/searchc'>
                         <h5>Click here to Search </h5>
                        </NavLink>
                    </NavItem> 
                   </Nav>
                   <Nav className='ms-auto' navbar >
                      <NavItem>
                        {isLoggedin}
                      </NavItem>
                    
                      <NavItem>
                      <NavLink className="nav-link" to='/cart'>
                        <h5 style={{paddingLeft:"5px"}}>Cart <span className="fa fa-shopping-cart fa-lg"></span> </h5>
                      </NavLink>
                      </NavItem>
                      <NavItem><Cartval/></NavItem>  
                    </Nav>
                
                </Collapse>
              </div>
            </Navbar>
           
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

const mapStateToProps = (state) => {
  return {
    newspapers: state.newspapers,
    magazines: state.magazines,
    items:state.cartReducer.items,
  };
};

const mapDispatchToProps=(dispatch)=>{
  return{
    getproducts: (newspapers,magazines)=>{dispatch(getproducts(newspapers,magazines))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
