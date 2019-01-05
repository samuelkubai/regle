import React, {Component, Fragment} from 'react';

import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown/index";

import './style.css';

export default class Fellow extends Component {
  render() {
    const { username } = this.props.match.params;

    return (
      <Fragment>
        <FellowStatsBanner username={username}/>

        <FellowSkillsBreakdown username={username}/>
      </Fragment>
    );
  }
}
