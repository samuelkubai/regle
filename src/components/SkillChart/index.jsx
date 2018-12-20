import React, { Component } from 'react';
import ReactChartkick, { AreaChart } from 'react-chartkick'
import Chart from 'chart.js'
import { format, startOfISOWeek, endOfISOWeek } from 'date-fns';

import '../custom-elements/CalendarPicker';
import CalendarPicker from '../CalendarPicker';

import './style.css';

import CalendarIcon from '../../assets/calendar.svg';

export default class SkillChart extends Component {
  state = {
    range: {
      start: format(startOfISOWeek(new Date()), 'YYYY-MM-DD'),
      end: format(endOfISOWeek(new Date()), 'YYYY-MM-DD')
    }
  };

  handleCalendarChange =  range => {
    this.setState(state => {
      return {
        ...state,
        range: range
      }
    })
  };

  componentDidMount () {
    ReactChartkick.addAdapter(Chart);
  }

  render () {
    const { range: { start, end } } = this.state;

    const { timeline } = this.props;

    return (
      <div className="skill-chart">
        <div className="skill-chart__header">
          <div className="skill-chart__title">
            Learning velocity history
          </div>

          <calendar-picker start={start} end={end} icon={CalendarIcon}>
            <CalendarPicker handleChange={this.handleCalendarChange}/>
          </calendar-picker>
        </div>

        <div className="skill-chart__body">
          <AreaChart curve={true} colors={['#A0D5F8']} data={timeline} />
        </div>
      </div>
    );
  }
}
