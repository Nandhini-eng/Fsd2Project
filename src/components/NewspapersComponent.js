import React, { useState } from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';

//Displaying the item with image and name in the form of card
function RenderItem({ item }) {
  return (
    <div className="zoom">
      <Card>
        <Link to={`/newspapers/${item.id}`}>
          <Pulse duration={1000}>
            <CardImg width="400px" height="400px" src={baseUrl + item.image} alt={item.name} />
            <CardHeader><h3>{item.name}</h3></CardHeader>
          </Pulse>
        </Link>

      </Card>
    </div>

  );
}


const NewspapersMain = (props) => {

//Sending each newspaper to RenderItem function 
  const items = props.newspapers.filteredItems.map((item) => {
    return (
      <div key={item.id}>
        <RenderItem item={item} />
        <br />
      </div>
    );
  });
  
  const [papers, setPapers] = useState(items);
  const [pageNumber, setPageNumber] = useState(0);

  const papersPerPage = 4;
  const pagesVisited = pageNumber * papersPerPage;
  const pageCount = Math.ceil(papers.length / papersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayPapers = papers
    .slice(pagesVisited, pagesVisited + papersPerPage)
    .map((paper) => {
      return (
        <div style={{ width: 250 }}>
          {paper}
        </div>
      );
    });

//Calling the loading component when newspapers are loading
  if (props.newspapers.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  //Displaying error message if newspapers are failed to load 
  else if (props.newspapers.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4>{props.newspapers.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  
  //Displaying newspapers in the form of card
  else {
    return (
      <div className="np">
        {/* Displaying breadcrum to navigate easily to home page */}
        <div style={{ paddingLeft: "70px", paddingRight: "15px" }}>
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
              <BreadcrumbItem active>Newspapers</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <Flash>
                <h3 style={{ color: "white" }}>NEWSPAPERS</h3>
              </Flash>
              <hr />
            </div>
          </div>
          <br />
          <div className="row">
            <div style={{ width: "17%", float: "left", paddingRight: "0px" }}>
              <div style={{ padding: "20px" }}>
                <label style={{ color: "#e39b98" }}>Filter By Language:</label>
                <select className="form-control" value={props.newspapers.language}
                  onChange={(e) => props.filterByLanguage(props.newspapers.newspapers, e.target.value)}>
                  <option value="">ALL</option>
                  <option value="English">English</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
              {/* Sorting the newspapers by price and name by calling sort_newspapers function */}
              <div style={{ padding: "10px" }}>
                <label style={{ color: "#e39b98" }}>
                  Sort by</label>
                <select className="form-control"
                  value={props.newspapers.sort}
                  onChange={(e) => props.sort_newspapers(props.newspapers.filteredItems, e.target.value)}>
                  <option value="">ALL</option>
                  <option value="lowestprice">Low to high price</option>
                  <option value="highestprice">High to low price</option>
                  <option value="prname">Name</option>
                </select>

              </div>
            </div>

            <div className="row" style={{ width: "80%", float: "right" }} >
              <Fade right>
                {displayPapers}
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </Fade>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default NewspapersMain;
