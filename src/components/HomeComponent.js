import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Fade from 'react-reveal/Fade';
import Pulse from 'react-reveal/Pulse';

function RenderCard({item}) {
    return(
        <Card>
            <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
            <CardHeader><h3>{item.name}</h3></CardHeader>
        </Card>
    );
}

function Home(props){
    const newspapers = props.newspapers.map((newspaper) => {
        return(
            
            <div className="col-12 col-md-3" key={newspaper.id} >
                <Fade left>
                    <Pulse>
                <RenderCard item={newspaper} />
                </Pulse>
                </Fade>
            </div>

        );
    });

    const magazines = props.magazines.map((magazine) => {
        return(
            <Fade left>
            <div className="col-12 col-md-3" key={magazine.id}>
                <Pulse>
                <RenderCard item={magazine} />
                </Pulse>
            </div>
            </Fade>
        );
    });

    if (props.newspapersLoading) {
        return(
            <div className="container">
                  <div className="row">            
                      <Loading />
                  </div>
            </div>
        );
    }
    else if (props.newspapersErrMess) {
        return(
            <div className="container">
                <div className="row">
                    <div className="center">
                        <h4>{props.newspapersErrMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else{
        return(
            <div style={{backgroundImage:`url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKOgeJqkug8VFubxTZqv6xwqGfyt-CzAsmA&usqp=CAU")`}}>
            <div className="container" >
                <div className="row row-content">
                    {newspapers}
                </div>

                <div className="row row-content">
                    {magazines}
                </div>
            </div>  
            </div>   
        );
    }
}

export default Home;