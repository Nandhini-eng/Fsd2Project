import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';
import { baseUrl } from '../shared/baseUrl';





function Searchc({ items }) {
  // initially we set searchfield to empty

  const [searchField, setSearchField] = useState("")
  console.log(items);
  console.log(searchField);

//filter items based on searchfield

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

 // search field gets changed automatically based on value entered by user in search bar

  const handleChange = (e) => {
    setSearchField(e.target.value);

  };


//below function render filtered items as cards for display

  function RenderItem({ item }) {
    return (
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

//we call above render item function for each and every filtered item

  const display = filteredItems.map((item) => {
    if (searchField != "") {

      return (
        <div style={{ width: 300 }}>
          <RenderItem item={item} />
        </div>
      );
    }
  });



  return (
    <div className='ser'>
      <section className='garamound'>

        <div className="center">

           {/* we take input from user  */}
          <input
            className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
            type="search"
            placeholder="Search for desired magazines or newspapers"
            onChange={handleChange}
          />

        </div>
        <span className="fa fa-search"></span>
        <div className='row' style={{ paddingLeft: "180px" }}>
          <div className="row" style={{ width: "80%", float: "right" }}>
            {display}
          </div>
        </div>

      </section>
    </div>
  );
}

//we mapState to props to get total items 

// const mapStateToProps = (state) => {
//   return {
//     cart: state.cartReducer.cart,
//     items: state.cartReducer.items,
//   };
// };


export default Searchc;

