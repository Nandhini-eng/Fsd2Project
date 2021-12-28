import React,{useState} from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";

function RenderItem({item}){
    return(
      <Card>
         <Link to={`/magazines/${item.id}`}>
            <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
            <CardHeader><h3>{item.name}</h3></CardHeader>
         </Link>    
      </Card>
      
    );
}


const MagazinesMain = (props) => {

        const items = props.magazines.filteredItems.map((item) => {
            return (
              <div key={item.id} className="col-12">
                <RenderItem item={item} />
                <br />
              </div>
             );
        });
        const [magazines, setMagazines] = useState(items);
        const [pageNumber, setPageNumber] = useState(0);

        const magazinesPerPage = 4;
        const pagesVisited = pageNumber * magazinesPerPage;
        const pageCount = Math.ceil(magazines.length / magazinesPerPage);

        const changePage = ({ selected }) => {
          setPageNumber(selected);
          };

        const displayMagazines = magazines
        .slice(pagesVisited, pagesVisited + magazinesPerPage)
        .map((magazine) => {
        return (
           <div style={{width:250}}>
             {magazine}
           </div>
           );
          });

        if (props.magazines.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
        }
        else if (props.magazines.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.magazines.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else{
          return (
            <div>
              <div style={{paddingLeft:"70px",paddingRight:"15px"}}>
              <div className="row">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Magazines</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                      <h3>MAGAZINES</h3>
                      <hr />
                  </div>                
              </div>
                <br />
              <div className="row">
                <div style={{width:"17%",float:"left",paddingRight:"10px"}}>
                
                <div style={{padding:"10px"}}>
                <label>Filter By Language:</label>
                <select className="form-control" value={props.magazines.language}
                    onChange={(e) => props.filterByLanguage(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                </select>
              </div>
              <div style={{padding:"10px"}}>
                <label>Filter By Category:</label>
                <select className="form-control" value={props.magazines.category}
                    onChange={(e) => props.filterByCategory(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="tech">Tech</option>
                    <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <div style={{padding:"10px"}}>
                <label>
                Sort by</label>
                  <select className="form-control" 
                  value={props.magazines.sort} 
                  onChange={(e)=> props.sort_magazines(props.magazines.filteredItems,e.target.value)}>
                    <option value="">ALL</option>
                    <option value="lowestprice">Low to high price</option>
                    <option value="highestprice">High to low price</option>
                    <option value="prname">Name</option>
                  </select>
                
                </div>
                </div>
                <div className="row" style={{width:"80%",float:"right"}}>    
                {displayMagazines}
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
                </div>
              </div>
              </div>
            </div>
          );
        }  
}

export default MagazinesMain;
