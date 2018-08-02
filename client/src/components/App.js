import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux'

import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
    componentDidMount(){
        this.props.fetchUser();
    }
    render(){
        return(
            <div className='container'>
                <Header />
                <Router>
                    <Switch>
                        <Route path='/' component={Landing} exact />
                        <Route path='/surveys/new' component={SurveyNew} />
                        <Route path='/surveys' component={Dashboard} />
                    </Switch>
                </Router>
            </div>
        );
    }
};

export default connect(null, actions)(App);