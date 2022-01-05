import React, { Component} from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,  Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import Cartval from './Cartval.js';
import {getproducts} from '../redux/ActionCreators';

import LightSpeed from 'react-reveal/LightSpeed';
import Jump from 'react-reveal/Jump';

import Searchc from './Searchc.js';
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

    

    render(props) {
      
      console.log(this.props.newspapers.newspapers)
      
  
    
        return(
          <React.Fragment>
            <Navbar dark expand="md" style={{ backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")` }}>
              <div className="container" style={{color:"white"}} >
                <NavbarToggler onClick={this.toggleNav} />
                {/* <NavbarBrand className="mr-auto" href="/">
                  <img src='assets/images/logo.png' height="50" width="50" alt='Newspapers and Magazines' />
                </NavbarBrand> */}
                <Collapse isOpen={this.state.isNavOpen} navbar>
                  <Nav navbar>
                    {/* <NavItem className="mr-auto" href="/">
                    <img src='assets/images/logo.png' height="30" width="30" alt='Newspapers and Magazines' />

                      </NavItem> */}
                      <NavItem>
                      <NavLink className="nav-link"  to='/home'>
                        <span className="fa fa-home fa-lg" ></span> Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className="nav-link"  to='/newspapers' >
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
                    

                    <NavItem ><Cartval/></NavItem>
                  
                      <NavItem>
                        <NavLink className="nav-link" to='/searchc'>
                        {/* <input 
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                        type = "search" 
                        placeholder = "Search People" 
                        onChange = {( e )=> {
                          this.setState({
                            SearchField:e.target.value
                          })}}/>
                          <Searchc  items={this.props.newspapers.newspapers} SearchField={this.state.SearchField} /> */}
                          Click here to Search
                      
                      </NavLink>
                      </NavItem>   
                      </Nav>
                
                </Collapse>
              </div>
            </Navbar>
           
             {/* green:#AFD275 */}
             {/* style={{backgroundColor:"#a2e8d0"}} greenish blue*/}
            <div className="bg" style={{backgroundColor:"#e7717d"}} >
             <div className="container" >
                 <div className="row row-header">
                   <LightSpeed>
                     <div className="col-12 col-sm-6" >
                         <h1 style={{color:"black"}}>Newspapers and Magazines</h1>
                         <p style={{color:"black"}}>We provide various Newspapers and Magazines in this application. Users can subscribe and purchase their favourite newspapers and magazines and enjoy the joy of reading! </p>
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
