import React from 'react';
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';


import Zoom from 'react-reveal/Zoom';

function RenderItem({props}) {
    const item=props.itemSelected;
    const addtocart=props.addtocart;
    console.log(props)
    const x=()=>{
    

        addtocart(item.id)
    


    }
    
        return( 
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" height="600px" src={baseUrl + item.image} alt={item.name} />
                        <CardBody>
                            <CardTitle><h2>{item.name}</h2></CardTitle>
                            <CardText><h4>Price: Rs.{item.price}</h4></CardText>
                        </CardBody>
                    </Card>   
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h3>Description</h3><br />
                    <h5>{item.description}</h5><br /><br />
                    <Zoom>


                    <button onClick={x} ><h4>Subscribe</h4></button>
                    </Zoom>
                </div>
            </React.Fragment>
        );

    }


const ItemDetail = (props) => {

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
    else if (props.itemSelected != null){
        
        
        return(
            <div className="container">
                <div className="row">
                    {/* <Breadcrumb>
                        <BreadcrumbItem><Link to="/newspapers">Newspapers</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.paperSelected.name}</BreadcrumbItem>
                    </Breadcrumb> */}
                    <div className="col-12">
                        <h3>{props.itemSelected.name}</h3>
                        <hr />
                    </div>                
                </div> 
                <div className="row">
                    
                    
                    <RenderItem props={props}/>
                               
                </div>
            </div>
        );
    }    
}





export default ItemDetail;