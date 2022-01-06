import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

function RenderNewspaper({item}) {
    return(
        <div className="zoom">
            <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                <Link to={`/newspapers/${item.id}`}>
                    <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
                    <CardHeader><h3>{item.name}</h3></CardHeader>
                </Link>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderMagazine({item}) {
    return(
        <div className="zoom">
            <FadeTransform in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                <Link to={`/magazines/${item.id}`}>
                    <CardImg width="100%" height="400px" src={baseUrl + item.image} alt={item.name} />
                    <CardHeader><h3>{item.name}</h3></CardHeader>
                </Link>
                </Card>
            </FadeTransform>
        </div>
    );
}

function Home(props){
    const newspapers = props.newspapers.map((newspaper) => {
        return(
            <div className="col-12 col-md-3" key={newspaper.id}>
                <RenderNewspaper item={newspaper} /> 
            </div>

        );
    });

    const magazines = props.magazines.map((magazine) => {
        return(
            <div className="col-12 col-md-3" key={magazine.id}>
                <RenderMagazine item={magazine} />
            </div>
        
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