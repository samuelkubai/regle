import React, { Component } from 'react';
import '../custom-elements/CalendarPicker';

import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'

import './style.css';

export default class SkillChart extends Component {
  state = {
    analytics: [
      ['Jan', 5],
      ['Feb', 14],
      ['Mar', 7],
      ['Apr', 17],
      ['May', 11],
      ['Jun', 9],
      ['Jul', 17],
      ['Aug', 12],
      ['Sep', 10],
      ['Oct', 9],
      ['Nov', 12],
      ['Dec', 4]
    ]

  };

  componentDidMount () {
    ReactChartkick.addAdapter(Chart);
  }

  render () {
    const { analytics } = this.state;

    return (
      <div className="skill-chart">
        <div className="skill-chart__header">
          <div className="skill-chart__title">
            Learning velocity history
          </div>

          <calendar-picker></calendar-picker>
        </div>

        <div className="skill-chart__body">
          <LineChart curve={true} colors={['#1E2834']} discrete={true} data={analytics} />
        </div>
      </div>
    );
  }
}
