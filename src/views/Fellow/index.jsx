import React, {Component, Fragment} from 'react';

import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";

import './style.css';

export default class Fellow extends Component {
  render() {
    const { email } = this.props.match.params;

    return (
      <Fragment>
        <FellowStatsBanner email={email}/>

        <FellowSkillsBreakdown email={email}/>
      </Fragment>
    );
  }
}
