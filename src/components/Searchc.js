import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Card, CardImg,  CardHeader, Breadcrumb, BreadcrumbItem ,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import { baseUrl } from '../shared/baseUrl';


 


function Searchc( {items}) {
  const [searchField,setSearchField]=useState("")

  

  console.log(items);
  console.log(searchField);
  
  const filteredItems = items.filter(
    
    (item) => {
      return (
        item
        .name
        .toLowerCase()
        .includes(searchField.toLowerCase())
      );
    }
  );
  

  const handleChange =( e )=> {
    setSearchField(e.target.value);
    
  };

 
  
function RenderItem({item}){
  return(
    <div className="zoom">
    <Card>
    <Link to={`/searchc/${item.id}`}>

          <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} />
          <CardHeader><h3>{item.name}</h3></CardHeader>
      
      
          </Link>
    </Card>
    </div>
    
  );
}



  const display=filteredItems.map((item) => {
    if(searchField!=""){
    
return (
  <div  style={{width:300}}>
    <RenderItem item={item}/>
  </div>
  );
}
 });  



  return (
    <section className='garamound'>
    
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
      </div>
      <div className='row' style={{paddingLeft:"180px"}}>
      <div className="row" style={{width:"80%",float:"right"}}>
      {display}
      </div>
      </div>
      
    </section>
  );
}



const mapStateToProps = (state) => {
    return {
      cart: state.cartReducer.cart,
      items:state.cartReducer.items,
    };
  };


export default connect(mapStateToProps)(Searchc);

// export default Searchc;