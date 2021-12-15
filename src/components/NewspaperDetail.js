import React from 'react';
import {useHistory} from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import {user}  from './Login'

function RenderItem({item}) {
    const history=useHistory();
    if (item != null){
        const IsLogin=()=>{ 
            if(user){
                console.log('yes')
            }
            else{
                console.log('no')
                history.push("/login");    
            }
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
                    <button onClick={IsLogin}><h4>Subscribe</h4></button>
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

const NewspaperDetail = (props) => {

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
    else if (props.paperSelected != null){
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/newspapers">Newspapers</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.paperSelected.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.paperSelected.name}</h3>
                        <hr />
                    </div>                
                </div> 
                <div className="row">
                    <RenderItem item={props.paperSelected} />             
                </div>
            </div>
        );
    }    
}

export default NewspaperDetail;