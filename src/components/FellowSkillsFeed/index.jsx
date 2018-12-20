import React, { Component } from 'react';

import '../custom-elements/SkillCard';
import '../custom-elements/Checkbox';

import './style.css';

export default class FellowSkillsFeed extends Component {
  render() {
    const { stacks, status, feed } = this.props;

    return (
      <div className="skills-feed">
        <div className="skills-filters">
          <div className="skills-filter">
            <div className="skills-filter__header">
              Status
            </div>

            <div className="skills-filter__body">
              {
                status.map((single_status) => {
                  return (<custom-checkbox key={`status-${single_status.name}`} checked={single_status.selected}>{ single_status.label }</custom-checkbox>)
                })
              }
            </div>
          </div>
          <div className="skills-filter">
            <div className="skills-filter__header">
              Stacks
            </div>

            <div className="skills-filter__body">
              {
                stacks.map((stack) => {
                  return (<custom-checkbox key={`stack-${stack.name}`} disabled={stack.disabled} checked={stack.selected}>{ stack.label }</custom-checkbox>)
                })
              }
            </div>
          </div>
        </div>

        <div className="skills-list">
          {
            feed.map(skill => {
              return (
                <skill-card
                  key={skill.id}
                  title={skill.title}
                  target={skill.target}
                  skill={skill.value}
                  icon={skill['skill-icon']}
                >
                </skill-card>
              );
            })
          }
        </div>
      </div>
    );
  }
}
