import React from 'react';
import { Card, CardImg, CardHeader, CardText, CardBody,CardTitle, CardSubtitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

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
            <div className="col-12 col-md-3" key={newspaper.id}>
                <RenderCard item={newspaper} />
            </div>
        );
    });

    const magazines = props.magazines.map((magazine) => {
        return(
            <div className="col-12 col-md-3" key={magazine.id}>
                <RenderCard item={magazine} />
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
            <div className="container">
                <div className="row row-content">
                    {newspapers}
                </div>

                <div className="row row-content">
                    {magazines}
                </div>
            </div>     
        );
    }
}

export default Home;