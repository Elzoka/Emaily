import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux'

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return(
            <Router>
                <div className="container">
                    <Header />
                    <Route path='/' component={Landing} exact />
                    <Route path='/surveys' component={Dashboard} exact />
                    <Route path='/surveys/new' component={SurveyNew} />
                </div>
            </Router>
        );
    }
};

export default connect(null, actions)(App);