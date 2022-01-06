import React,{useState} from 'react';
import { Card, CardImg, CardHeader, Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
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

        //let filteredItems = props.magazines.filteredItemsbyCtgry.filter(x => props.magazines.filteredItemsbyLang.includes(x));
        // const items = filteredItems.map((item) => {
        //     return (
        //       <div key={item.id} className="col-12">
        //         <RenderItem item={item} />
        //         <br />
        //       </div>
        //      );
        // });

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
      


        var items_reviews = [];
          
        var item_review = {};
        var len = props.magazines.magazines.length;

        for (var i=20;i<len+20;i++){
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
                    onChange={(e) => props.filterByCategory(props.magazines.filteredItemsbyLang, e.target.value)}>
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
                  onChange={(e)=> props.sort_magazines(props.magazines.filteredItemsbyCtgry,e.target.value)}>
                    <option value="">ALL</option>
                    <option value="lowestprice">Low to high price</option>
                    <option value="highestprice">High to low price</option>
                    <option value="prname">Name</option>
                  </select>
                </div>
                <br />
                <br />
                <div style={{padding:"10px"}}>
                  <Button onClick={() => props.topMagazines(props.magazines.magazines, filtered_revs)}>Top Rated Magazines</Button> 
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
