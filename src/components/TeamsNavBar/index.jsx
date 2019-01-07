import React, { Component } from 'react';

// Import assets
import MembersIcon from '../../assets/team-blue.svg';
import RepositoriesIcon from '../../assets/github.svg';
import SkillsIcon from '../../assets/skills.svg';
import TargetIcon from '../../assets/target.svg';
import SettingsIcon from '../../assets/settings.svg';
import CaretIcon from '../../assets/caret-both.svg';
import TravelaLogo from '../../assets/travela.svg';

// Import styles
import './style.css';

export default class TeamsNavBar extends Component {
  render () {
    return (
      <div className="teams-nav-bar">
        {/* Contain the teams nav bar */}
        <ul>
          <li className="active"><img src={MembersIcon} alt="Members"/> Members</li>
          <li><img src={RepositoriesIcon} alt="Repositories"/> Repositories</li>
          <li><img src={SkillsIcon} alt="Skills"/> Skills</li>
          <li><img src={TargetIcon} alt="Targets"/> Targets</li>
          <li><img src={SettingsIcon} alt="Settings"/> Settings</li>
        </ul>

        {/* Contain the teams dropdown */}
        <div className="team-dropdown">
          <img className="logo" src={TravelaLogo} alt="Travela"/> Travela <img className="icon" src={CaretIcon} alt="Toggle"/>
        </div>
      </div>
    );
  }
}
