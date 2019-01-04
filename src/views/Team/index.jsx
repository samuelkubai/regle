import React, { Component, Fragment } from 'react';

// Import the team's components
import TeamsNavBar from '../../components/TeamsNavBar';
import CalendarScroll from '../../components/CalendarScroll';
import TeamTable from '../../components/TeamTable';

// Import styles
import './style.css'

export default class Team extends Component {
  render() {
    return (
      <Fragment>
        <div className="navbar-divider">
        </div>
        <TeamsNavBar />
        <CalendarScroll />
        <TeamTable />
      </Fragment>

    );
  }
}
