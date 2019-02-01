import React, { Component } from 'react';

import '../custom-elements/SkillCard';
import '../custom-elements/Checkbox';

import './style.css';

export default class FellowSkillsFeed extends Component {
  render() {
    const { stacks, status, feed } = this.props;

    return (
      <div className="skills-feed">
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
