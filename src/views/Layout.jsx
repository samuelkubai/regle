import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import React, { Component, Fragment } from 'react';

// Setup the redux environment
import { fetchUserTeams } from "../store/actions/shell";

// Import the child components
import '../components/custom-elements/NavBar/index';
import '../components/custom-elements/Breadcrumbs/index';
import Shell from '../components/Shell';

// Import the HOC components
import AuthHOC from '../components/hoc/auth';

class Layout extends Component {
  async componentDidMount() {
    const { fetchUserTeams } = this.props;

    fetchUserTeams();
  }

  render() {
    const { user, children, teams, setupComplete } = this.props;

    return (
      <Shell avatar={user.UserInfo.picture} username={user.UserInfo.name} teams={teams} setup-complete={setupComplete}>
        { <Fragment> {children} </Fragment> }
      </Shell>
    );
  }
}

const initMapStateToProps = ({ shell }) => {
  return {
    selectedTeam: shell.selectedTeam,
    setupComplete: shell.teams__loaded,
    teams: shell.teams
  };
};

const initMapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUserTeams }, dispatch);
};

export default AuthHOC(withRouter(connect(initMapStateToProps, initMapDispatchToProps)(Layout)));
