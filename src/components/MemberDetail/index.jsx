import React, { Component, Fragment } from "react";


// Import the component's presentational components
import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";
import OverlayLoader from '../../components/OverlayLoader';

// Import the component's assets
import "./style.css";

export default class MemberDetail extends Component {
  state = {
    statsLoaded: false,
    skillsLoaded: true
  };

  componentDidUpdate() {
    console.log('Component was updated');
  }

  render () {
    const { email } = this.props.match.params;
    const {statsLoaded, skillsLoaded} = this.state;

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
  }
}
