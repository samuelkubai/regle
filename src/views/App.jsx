import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Setup the redux store
import store from '../store';

// Import all the components necessary
import Login from '../views/Login';
import Layout from '../views/Layout';
import Redirect from "./Redirect";
import Team from "./Team";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route
                path="/"
                exact
                component={Login}
              />
              <Route>
                <Layout>
                  <Switch>
                    <Route path="/redirect" exact component={Redirect} />
                    <Route path="/teams/:team/members/" exact component={Team} />
                    <Route path="/teams/:team/members/:email" exact component={Team} />
                  </Switch>
                </Layout>
              </Route>
            </Switch>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}
