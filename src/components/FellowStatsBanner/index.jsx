import axios from 'axios';
import Cookie from 'cookies-js';
import React, { Component } from 'react';

// Import the component's assets
import ArrowUp from '../../assets/arrow-pointing-to-up.svg';
import ArrowDown from '../../assets/arrow-pointing-to-down.svg';

import "./style.css";

export default class FellowStatsBanner extends Component {
  state = {
    analytics: { analytics: [] },
    meta: { user: {} }
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
    const { completed, email } = this.props;
    const token = Cookie.get('jwt-token');

    const response = await axios.get(
      `${REACT_APP_API_URL}/analytics?email=${email}`,
      { headers: { Authorization: `${token}` } }
    );

    const analytics = response.data;
    this.setState(state => {
      return {
        ...state,
        analytics: analytics.data,
        meta: analytics.meta
      }
    });

    completed();
  }

  render () {
    const { analytics: { analytics }, meta: { user } } = this.state;

    return (
      <div className="banner">
        <div className="user-bio">
          <img className="user-image" src={user.profile_picture} alt="User Profile"/>
          <div className="user-info">
            <div className="user-info__name">
              {user.name}
            </div>
            <div className="user-info__phase">
              Phase {user.phase} ({user.duration} weeks in apprenticeship)
            </div>
          </div>
        </div>

        <div className="user-statistics">
          {analytics.map(analytic => (
            <div key={analytic.label} className="user-statistic">
              <div className="user-statistic__label">
                {analytic.label}
              </div>

              <div className="user-statistic__value">
                <img className="user-statistic__icon" src={analytic.progress ? ArrowUp : ArrowDown } alt="Down"/>
                <div className="user-statistic__main">
                  {analytic.value.toLocaleString()}
                </div>
                <div className="user-statistic__against">
                  {analytic.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
