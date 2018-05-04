import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import NotFound from './components/pages/NotFound';
import Login from './components/Login';
import p404 from './components/404';
import App from './App';


export default () => (
    <Router>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/404" component={p404} />
            <Route  path="/" component={App} />
        </Switch>
    </Router>
)