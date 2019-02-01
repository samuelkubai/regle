import React, { Component, Fragment } from 'react';

import SkillChart from '../../components/SkillChart';
import FellowSkillsFeed from "../../components/FellowSkillsFeed";
import Cookie from "cookies-js";
import axios from "axios/index";

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
    await this.loadData();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.email !== prevProps.email) {
      await this.loadData();
    }
  }

  async loadData() {
    const { REACT_APP_API_URL } = process.env;
    const { completed, email, loading } = this.props;

    loading();

    const response = await fetch(`${REACT_APP_API_URL}/velocity?email=${email}`)
      .then(res => res.json());


    this.setState(state => {
      return {
        ...state,
        velocity: response.data,
        meta: response.meta
      }
    });

    completed();
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
