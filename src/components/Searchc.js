import React, { useState } from 'react';
import {connect} from 'react-redux';
import { Card, CardImg,  CardHeader, Breadcrumb, BreadcrumbItem ,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import { baseUrl } from '../shared/baseUrl';


 


function Searchc( {items} ) {

  const [searchField, setSearchField] = useState("");
  console.log(items)
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
  console.log(filteredItems)

  const handleChange =( e )=> {
    setSearchField(e.target.value);
    
  };

 
  
function RenderItem({item}){
  return(
    <div className="zoom">
    <Card>
      

          <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} />
          <CardHeader><h3>{item.name}</h3></CardHeader>
      
      
          
    </Card>
    </div>
    
  );
}



  const display=filteredItems.map((item) => {
    console.log(item)
return (
  <div style={{width:300}}>
    <RenderItem item={item}/>
  </div>
  );
 });  



  return (
    <section className="garamond">
    
      <div className="pa2">
        <input 
          className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
          type = "search" 
          placeholder = "Search People" 
          onChange = {handleChange}
        />
      </div>
      {display}
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