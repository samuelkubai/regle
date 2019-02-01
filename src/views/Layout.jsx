import _ from 'lodash';
import React, { Component, Fragment } from 'react';

import '../components/custom-elements/NavBar/index';
import '../components/custom-elements/Breadcrumbs/index';

import AuthHOC from '../components/hoc/auth';
import Shell from '../components/Shell';

import TravelaLogo from '../assets/travela.svg';

class Layout extends Component {
  getBreadCrumbs() {
    const crumbs = _.without(window.location.pathname.split("/").map(crumb => _.capitalize(crumb.trim())), "");

    return _.join(crumbs, ",");
  }

  render() {
    const { user, children } = this.props;

    return (
      <Shell avatar={user.UserInfo.picture} username={user.UserInfo.name}>
        <Fragment>
          { children }
        </Fragment>
      </Shell>
    );
  }
}

export default AuthHOC(Layout);
