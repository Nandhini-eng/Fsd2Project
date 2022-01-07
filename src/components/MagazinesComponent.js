import React,{useState} from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';
import Zoom from 'react-reveal/Zoom';
import Flash from 'react-reveal/Flash';


//Funtional component to render each magazine in a reactstrap Card
function RenderItem({item}){
    return(
      <div className='zoom'>
        <Card>
          <Link to={`/magazines/${item.id}`}>           {/* linking each magazine to it's details page */}
              <Pulse>
              <CardImg width="400px" height="400px"  src={baseUrl + item.image} alt={item.name} style={{ overflow: "hidden" }}
        onMouseOver={(e) => (e.currentTarget.style = { transform: "scale(1.25)", overflow: "hidden" })}
        onMouseOut={(e) => (e.currentTarget.style = { transform: "scale(1)", overflow: "hidden" })} />
              <div className='hg'>
                <CardHeader><h4>{item.name}</h4></CardHeader>
              </div>
              </Pulse>
          </Link>    
        </Card>
      </div>
      
    );
}


const MagazinesMain = (props) => {

        //Rendering the magazines according to the applied filters
        var render_items = [];
        props.magazines.filteredItemsbyCtgry.map(x => props.magazines.filteredItemsbyLang.map(y =>
          x.id === y.id ? render_items.push({...x}): null ))
        
        const items = render_items.map((item) => {
          return (
              <div key={item.id} className="col-12">
                  <RenderItem item={item} />
                  <br />
              </div>
            );
          });
      

        //calculating average rating for all magazines and storing them in an array along with magazine ids

        var items_reviews = [];
          
        var item_review = {};
        var len = props.magazines.magazines.length;

        for (var i=20;i<len+20;i++){
          var sum = 0, avg = 0;
          item_review.itemId = i;
          var revs = props.reviews.filter(rev => rev.itemId === i);
          if (revs.length){
            sum = revs.map(rev=>rev.rating).reduce((r1,r2)=>r1+r2,0);
            avg = sum/revs.length;
          }
          item_review.avgRating = avg;
          items_reviews.push({...item_review});
        }
        
        // In an array, storing the average rating values along with ids of only those magazines for which average rating lies between 4 and 5.
        var filtered_revs = items_reviews.filter(rev => rev.avgRating >= 4 && rev.avgRating <= 5)




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
           <div style={{width:260}}>
             {magazine}
           </div>
           );
          });

        //condition for displaying loading icon while fetching the magazines data from the json-server.
        if (props.magazines.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
        }
        //condition for displaying error message when magazines are failed to fetch from the (mock)server.
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
        //else returning the magazines based on the applied filtering or sorting conditions and after applying pagination
        else{
          return (

            <div className="mag">
              <div style={{paddingLeft:"70px",paddingRight:"15px"}}>
              <div className="row">
                  <Breadcrumb style={{fontSize:"20px"}}>
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
                <div style={{width:"17%",float:"left",paddingRight:"0px",fontSize:"20px"}}>

                {/* providing language filter by giving language select options in the form of a dropdown menu */}
                <div style={{padding:"10px"}}>
                <label style={{color:"#e39b98",fontFamily:"cursive",fontSize:"20px"}}>Filter By Language:</label>
                <select className="form-control" value={props.magazines.language}
                    onChange={(e) => props.filterByLanguage(props.magazines.magazines, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                </select>
              </div>

              {/* providing category filter by giving category select options in the form of a dropdown menu */}
              <div style={{padding:"10px"}}>
                <label style={{color:"#e39b98",fontFamily:"cursive",fontSize:"20px"}}>Filter By Category:</label>
                <select className="form-control" value={props.magazines.category}
                    onChange={(e) => props.filterByCategory(props.magazines.filteredItemsbyLang, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="business">Business</option>
                    <option value="sports">Sports</option>
                    <option value="tech">Tech</option>
                    <option value="entertainment">Entertainment</option>
                </select>
              </div>
              <div style={{padding:"10px"}}>
                <label style={{color:"#e39b98",fontFamily:"cursive",fontSize:"20px"}}>
                Sort by</label>
                  <select className="form-control" 
                  value={props.magazines.sort} 
                  onChange={(e)=> props.sort_magazines(props.magazines.filteredItemsbyCtgry,e.target.value)}>
                    <option value="">ALL</option>
                    <option value="lowestprice">Low to high price</option>
                    <option value="highestprice">High to low price</option>
                    <option value="prname">Name</option>
                  </select>
                </div>
                <br />
                <br />

                {/* Created a button for displaying top rated magazines(magazines for which average rating lies between 4 and 5)  */}
                <div style={{padding:"10px"}} className='zoom'>
                  <Button onClick={() => props.topMagazines(props.magazines.magazines, filtered_revs)}><h3 style={{fontSize:"17px",color:"#3e046e",fontFamily:"cursive",fontWeight:"bold"}}>
                          Top Rated Magazines</h3></Button> 
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
