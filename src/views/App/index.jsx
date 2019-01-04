import React, {Component, Fragment} from 'react';

import '../../components/custom-elements/NavBar/index';
import '../../components/custom-elements/Breadcrumbs/index';


import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";
import AuthHOC from '../../components/hoc/auth';

import Logo from '../../assets/logo.svg';
import Caret from '../../assets/union.svg';

import './style.css';

class App extends Component {
  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <bread-crumbs
          title="Regle"
          icon={Logo}
          path="Dashboard,Team,samuel.kubai@andela.com"
        >
        </bread-crumbs>

        <FellowStatsBanner/>

        <FellowSkillsBreakdown/>

        <nav-bar
          profile-name={user.UserInfo.name}
          profile-image={user.UserInfo.picture}
          chevron-down={Caret}
        >
        </nav-bar>
      </Fragment>
    );
  }
}

export default AuthHOC(App);
