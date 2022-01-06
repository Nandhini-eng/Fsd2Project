import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader} from 'reactstrap';
import { Link } from 'react-router-dom';
import Jump from 'react-reveal/Jump';
import LightSpeed from 'react-reveal/LightSpeed';
import HeadShake from 'react-reveal/HeadShake';


function About(props) {

    return(
        <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`}}>
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3 style={{color:"#e39b98"}}>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <Jump>
                <div className="col-12 col-md-6" style={{color:"white"}}>
            
                    <h2></h2>
                    <p>In our app, One can subscribe to newspapers and magazines which are not available in their areas.</p>
                    <p>Instead of contacting particular distributor for each type of newspaper and magazine, it is easy to find various kinds of popular newspapers and magazines at one place.</p>
                    <p>In this app we provide famous and well known newspapers of two languages(English and Telugu), magazines of two languages(English and Telugu) and of four different selected categories</p>
                    <p>Users can extend their subscription plan of a desired newspaper and magazine for a period of time.
Users can subscribe to multiple newspapers and magazines at a time by adding them to cart and can place the order.
</p>
                </div>
                </Jump>
                <div className="col-12 col-md-5" >
                    <HeadShake>
                    <Card >
                        <CardHeader style={{backgroundColor:"#e39b98"}} >Project Management Team</CardHeader>
                        <CardBody style={{backgroundColor:"#a2e8d0"}}>
                            <dl className="row p-1" style={{color:"black"}} >
                                <dt className="col-6">R.Bhagya Sree</dt>
                                <dt className="col-6">P.V. Nandhini</dt>
                                <dt className="col-6">B.G. Jaya Samhitha</dt>
                                <dt className="col-6">I. Bhanu Aswitha</dt>
                                <dt className="col-6">T. Swetha</dt>
                                <dt className="col-6">K. Sadguna</dt>
                                
                            </dl>
                        </CardBody>
                    </Card>
                    </HeadShake>
                </div>
                
            </div>
        </div>
        </div>
    );
}

export default About;    