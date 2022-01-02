import React,{useState} from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import Flash from 'react-reveal/Flash';


function RenderItem({item}){
    return(
      <div className='zoom'>
      <Card>
         <Link to={`/magazines/${item.id}`}>
            <Pulse>
            <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} style={{ overflow: "hidden" }}
      onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
      onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })} />
            <CardHeader><h3>{item.name}</h3></CardHeader>
            </Pulse>
         </Link>    
      </Card>
      </div>
      
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
           <div style={{width:300}}>
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
            <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`,backgroundSize:"auto"}}>
              <div style={{paddingLeft:"70px",paddingRight:"15px"}}>
              <div className="row">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Magazines</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                    <Flash>
                      <h3 style={{color:"white"}}>MAGAZINES</h3>
                      </Flash>
                      <hr />
                  </div>                
              </div>
                <br />
              <div className="row">
                <div style={{width:"17%",float:"left",paddingRight:"10px"}}>
                
                <div style={{padding:"10px"}}>
                <label style={{color:"#e39b98"}}>Filter By Language:</label>
                <select className="form-control" value={props.magazines.language}
                    onChange={(e) => props.filterByLanguage(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                </select>
              </div>
              <div style={{padding:"10px"}}>
                <label style={{color:"#e39b98"}}>Filter By Category:</label>
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
                <label style={{color:"#e39b98"}}>
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
                  <Fade right>   
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
                  </Fade> 
                </div>
              </div>
              </div>
            </div>
          );
        }  
}

export default MagazinesMain;
