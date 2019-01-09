import React, { Component, Fragment } from 'react';

import SkillChart from '../../components/SkillChart';
import FellowSkillsFeed from "../../components/FellowSkillsFeed";

export default class FellowSkillsBreakdown extends Component {
  state = {
    velocity: {
      feed: [],
      timeline: []
    },
    meta: {
      filters: {
        stacks: [],
        status: []
      }
    }
  };

  async componentDidMount() {
    const { REACT_APP_API_URL } = process.env;
    const { email } = this.props;

    const response = await fetch(`${REACT_APP_API_URL}/velocity?email=${email}`)
      .then(res => res.json());

    this.setState(state => {
      return {
        ...state,
        velocity: response.data,
        meta: response.meta
      }
    });
  }

  render() {
    const { velocity: { feed, timeline }, meta: { filters: { stacks, status }} } = this.state;

    return (
      <Fragment>
        <SkillChart timeline={timeline}/>

        <FellowSkillsFeed stacks={stacks} status={status} feed={feed}/>
      </Fragment>
    );
  }
}
