import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';

function RenderItem({item}) {
    if (item != null){
        return( 
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" height="600px" src={baseUrl + item.image} alt={item.name} />
                        <CardBody>
                            <CardTitle><h3>{item.name}/{item.category}</h3></CardTitle>
                            <CardText><h4>Price: Rs.{item.price}</h4></CardText>
                        </CardBody>
                    </Card>   
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h3>Description</h3><br />
                    <h5>{item.description}</h5><br /><br />
                    <button><h4>Subscribe</h4></button> 
                </div>
            </React.Fragment>
        );
    }
    else{
       return(
           <div></div>
       ); 
    }
}

const MagazineDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.magSelected != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/magazines">Magazines</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.magSelected.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.magSelected.name}</h3>
                        <hr />
                    </div>                
                </div> 
                <div className="row">
                    <RenderItem item={props.magSelected} />             
                </div>
            </div>
        );
    }    
}

export default MagazineDetail;