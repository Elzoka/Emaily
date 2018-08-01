import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './Header';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
const Landing = () => <h2>Landing</h2>

const App = () => {
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
};

export default App;