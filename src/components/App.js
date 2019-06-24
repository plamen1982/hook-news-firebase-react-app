import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import CreateLink from './Link/CreateLink';
import SearchLinks from './Link/SearchLinks';
import LinkDetail from './Link/LinkDetail';
import LinkList from './Link/LinkList';
import Header from './Header';

function App() {
  return (
    <Router>
        <div className="app-container">
            <Header />
            <div className="route-container">
              <Switch>
                <Route exact path='/' render={() => <Redirect to="/new/1" />}></Route>
                <Route path='/create' component={CreateLink}></Route>
                <Route path='/login' component={Login}></Route>
                <Route path='/forgot' component={ForgotPassword}></Route>
                <Route path='/search' component={SearchLinks}></Route>
                <Route path='/top' component={LinkList}></Route>
                <Route path='/new/:page' component={LinkList}></Route>
                <Route path='/link/:linkId' component={LinkDetail}></Route>
              </Switch>
            </div>
        </div>
    </Router>
  );
}

export default App;
