import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Import all the components necessary
import Login from '../views/Login';
import Layout from '../views/Layout';
import Fellow from "./Fellow";
import Team from "./Team";

export default class App extends Component {
  render() {
    return (
      <div className="app">
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
                  <Route path="/teams/:team/members/" exact component={Team} />
                  <Route path="/teams/:team/members/:email" exact component={Team} />
                </Switch>
              </Layout>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
