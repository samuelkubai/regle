import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import '../components/custom-elements/NavBar/index';
import '../components/custom-elements/Breadcrumbs/index';
import Team from './Team';
import Fellow from './Fellow';

import AuthHOC from '../components/hoc/auth';

import Logo from '../assets/logo.svg';
import Caret from '../assets/union.svg';

class Layout extends Component {
  render() {
    const { user } = this.props;

    return (
      <Router>
        <Fragment>
          <bread-crumbs
            title="Regle"
            icon={Logo}
            path="Dashboard,Team,samuel.kubai@andela.com"
          >
          </bread-crumbs>

          <Route path="/teams/:team" exact component={Team} />
          <Route path="/teams/:team/:username" exact component={Fellow} />

          <nav-bar
            profile-name={user.UserInfo.name}
            profile-image={user.UserInfo.picture}
            chevron-down={Caret}
          >
          </nav-bar>
        </Fragment>
      </Router>
    );
  }
}

export default AuthHOC(Layout);
