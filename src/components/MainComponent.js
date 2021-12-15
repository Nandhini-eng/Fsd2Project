import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Account from './AccountComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import NewspapersMain from './NewspapersComponent';
import NewspaperDetail from './NewspaperDetail';
import MagazinesMain from './MagazinesComponent';
import MagazineDetail from './MagazineDetail';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchNewspapers, fetchMagazines, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) => (
  {
    newspapers: state.newspapers,
    magazines: state.magazines,  
  }
);

const mapDispatchToProps = (dispatch) => ({
  
    fetchNewspapers: () => {dispatch(fetchNewspapers())},
    fetchMagazines: () => {dispatch(fetchMagazines())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)), 
    
});

class Main extends Component{
   
    componentDidMount() {
      this.props.fetchNewspapers();
      this.props.fetchMagazines();
    }

    render() {

        const HomePage = () => {
            return(
              <Home 
                newspapers={this.props.newspapers.newspapers.filter((newspaper) => newspaper.featured)}
                newspapersLoading={this.props.newspapers.isLoading}
                newspapersErrMess={this.props.newspapers.errMess}
              />
            );
        }

        const NewspaperWithId = ({match}) => {
          return(
            <NewspaperDetail paperSelected={this.props.newspapers.newspapers.filter((paper) => paper.id === parseInt(match.params.paperId,10))[0]} 
              isLoading={this.props.newspapers.isLoading}
              errMess={this.props.newspapers.errMess}
              />
        );
        }

        const MagazineWithId = ({match}) => {
          return(
            <MagazineDetail magSelected={this.props.magazines.magazines.filter((magazine) => magazine.id === parseInt(match.params.magId,10))[0]} 
              isLoading={this.props.magazines.isLoading}
              errMess={this.props.magazines.errMess}
              />
        );
        }

        return(
            <div>
              <Header />  
              <Switch location={this.props.location}>
                <Route path='/home' component={HomePage} />
                <Route exact path='/newspapers' component={() => <NewspapersMain newspapers={this.props.newspapers} />} />
                <Route path='/newspapers/:paperId' component={NewspaperWithId} />
                <Route exact path='/magazines' component={() => <MagazinesMain magazines={this.props.magazines} />} />
                <Route path='/magazines/:magId' component={MagazineWithId} />
                <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> 
                <Route path='/myaccount' component={() => <Account />} />
                <Route path='/aboutus' component={() => <About />} />
                <Redirect to="/home" />
              </Switch>
              <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));