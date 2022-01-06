import React,{useState} from 'react';
import { Card, CardImg,  CardHeader, Breadcrumb, BreadcrumbItem ,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import ReactPaginate from "react-paginate";
import "./paginate.css";
import Fade from 'react-reveal/Fade';

import Pulse from 'react-reveal/Pulse';
import Flash from 'react-reveal/Flash';


function RenderItem({item}){
    
    return(
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

        const items = props.newspapers.filteredItems.map((item) => {
            return (
              <div key={item.id}>
                <RenderItem item={item}/>
                <br />
              </div>
            );
        });

      

        var items_reviews = [];
          
        var item_review = {};
        var len = props.newspapers.newspapers.length;

    
        for (var i=0;i<len;i++){
          var sum = 0, avg = 0;
          item_review.itemId = i;
          var revs = props.reviews.filter(rev => rev.itemId === i);
          //console.log(JSON.stringify(revs));
          if (revs.length){
            sum = revs.map(rev=>rev.rating).reduce((r1,r2)=>r1+r2,0);
            avg = sum/revs.length;
          }
          item_review.avgRating = avg;
          items_reviews.push({...item_review});
        }
        //console.log(JSON.stringify(items_reviews));
        

        var filtered_revs = items_reviews.filter(rev => rev.avgRating >= 4 && rev.avgRating <= 5)
        console.log(JSON.stringify(filtered_revs));
        console.log(filtered_revs.length);

      

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
           <div style={{width:300}}>
             {paper}
           </div>
           );
          });


        if (props.newspapers.isLoading) {
          return(
              <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
              </div>
          );
        }
        else if (props.newspapers.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.newspapers.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else{
          return (
            <div  style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`,backgroundSize:"auto"}}>
              <div style={{paddingLeft:"70px",paddingRight:"15px"}}>
              <div className="row">
                  <Breadcrumb>
                      <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                      <BreadcrumbItem active>Newspapers</BreadcrumbItem>
                  </Breadcrumb>
                  <div className="col-12">
                    <Flash>
                      <h3 style={{color:"white"}}>NEWSPAPERS</h3>
                      </Flash>
                      <hr />
                  </div>                
              </div>
              <br/>
              <div className="row">
                <div style={{width:"17%",float:"left",paddingRight:"0px"}}>
                <div style={{padding:"20px"}}>
                <label style={{color:"#e39b98"}}>Filter By Language:</label>
                <select className="form-control" value={props.newspapers.language}
                    onChange={(e) => props.filterByLanguage(props.newspapers.newspapers, e.target.value)}>
                    <option value="">ALL</option>
                    <option value="English">English</option>
                    <option value="Telugu">Telugu</option>
                </select>
                </div>
              
                <div style={{padding:"10px"}}>
                  <label style={{color:"#e39b98"}}>
                    Sort by</label>
                  <select className="form-control" 
                  value={props.newspapers.sort} 
                  onChange={(e)=> props.sort_newspapers(props.newspapers.filteredItems,e.target.value)}>
                    <option value="">ALL</option>
                    <option value="lowestprice">Low to high price</option>
                    <option value="highestprice">High to low price</option>
                    <option value="prname">Name</option>
                  </select>
                </div>
                <br />
                <br />
                <div style={{padding:"10px"}}>
                  <Button onClick={() => props.topNewspapers(props.newspapers.newspapers, filtered_revs)}>Top Rated Newspapers</Button> 
                </div>

                </div>
                
                <div className="row" style={{width:"80%",float:"right"}} >
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
