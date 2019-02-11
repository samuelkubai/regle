import React, { Component, Fragment } from "react";

// Import the component's presentational components
import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";
import OverlayLoader from '../../components/OverlayLoader';

// Import the component's assets
import NoDeveloperIcon from '../../assets/no-developer.svg';
import "./style.css";

export default class MemberDetail extends Component {
  state = {
    statsLoaded: false,
    skillsLoaded: true
  };

  componentDidUpdate() {
    console.log('UPDATED: MemberDetail was updated')
  }

  renderNoDetailPage = () => {
    return (
      <div className="member-detail__container">
        <div className="member-detail__placeholder-container">
          <div className="member-detail__placeholder-filter"></div>
          <div className="member-detail__placeholder-image">
            <img src={NoDeveloperIcon} alt="No member selected"/>
          </div>

          <div className="member-detail__placeholder-text">
            Select a developer to view their statistics
          </div>
        </div>
      </div>
    );
  };

  renderDetailPage = ({ email, statsLoaded, skillsLoaded }) => {
    return (
      <div className="member-detail__container">
        {!(statsLoaded && skillsLoaded) ? <OverlayLoader/> : ''}

        <FellowStatsBanner
          completed={() => {
            this.setState(state => {
              return {
                ...state,
                statsLoaded: true
              }
            })
          }}
          loading={() => {
            this.setState(state => {
              return {
                ...state,
                statsLoaded: false
              };
            })
          }}
          email={email}
        />

        <FellowSkillsBreakdown
          completed={() => {
            this.setState(state => {
              return {
                ...state,
                skillsLoaded: true
              }
            })
          }}
          loading={() => {
            this.setState(state => {
              return {
                ...state,
                statsLoaded: false
              };
            })
          }}
          email={email}
        />
      </div>
    );
  };

  render () {
    const { selectedMember } = this.props;
    const {statsLoaded, skillsLoaded} = this.state;

    return (!selectedMember) ?
      this.renderNoDetailPage() :
      this.renderDetailPage({ email: selectedMember, skillsLoaded, statsLoaded })
  }
}
