import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardHeader, Label, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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

        const items = props.magazines.magazines.map((item) => {
            return (
              <div key={item.id} className="col-12 col-md-3">
                <RenderItem item={item} />
                <br />
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
            <div className="container">
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
              <div className="row">
                 {items} 
              </div>
            </div>
          );
        }  
}

export default MagazinesMain;
