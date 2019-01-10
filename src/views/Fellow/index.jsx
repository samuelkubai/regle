import React, {Component, Fragment} from 'react';

import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";
import OverlayLoader from '../../components/OverlayLoader';

import './style.css';

export default class Fellow extends Component {
  state = {
    statsLoaded: false,
    skillsLoaded: false
  };

  render() {
    const { email } = this.props.match.params;
    const {statsLoaded, skillsLoaded} = this.state;

    return (
      <Fragment>
        {!(statsLoaded && skillsLoaded) ? <OverlayLoader/> : ''}

        <FellowStatsBanner completed={() => {
          this.setState(state => {
            return {
              ...state,
              statsLoaded: true
            }
          })
        }} email={email}/>

        <FellowSkillsBreakdown completed={() => {
          this.setState(state => {
            return {
              ...state,
              skillsLoaded: true
            }
          })
        }}  email={email}/>
      </Fragment>
    );
  }
}
