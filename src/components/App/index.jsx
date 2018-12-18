import React, { Component, Fragment } from 'react';
import '../custom-elements/NavBar';
import '../custom-elements/Checkbox';
import '../custom-elements/SkillCard';

import SkillChart from '../SkillChart';

import ArrowRight from '../../assets/arrow-pointing-to-right.svg';
import CaretDown from '../../assets/caret-down.svg';
import ProfileImage from '../../assets/regle-profile.png';
import DeveloperImage from '../../assets/developer-image.png';
import ArrowUp from '../../assets/arrow-pointing-to-up.svg';
import ArrowDown from '../../assets/arrow-pointing-to-down.svg';
import ReactIcon from '../../assets/atom.svg';
import SassIcon from '../../assets/sass.svg';
import NodeIcon from '../../assets/nodejs.svg';

import './style.css';
import './skills.css';

export default class App extends Component {
    render () {
        return (
            <Fragment>
                <nav-bar
                  icon={ArrowRight}
                  navigate={() => console.log("Navigate now.")}
                  profile-name="Irene Njeri"
                  profile-image={ProfileImage}
                  chevron-down={CaretDown}
                >
                </nav-bar>

                <div className="banner">
                  <div className="user-bio">
                    <img className="user-image" src={DeveloperImage} alt="User Profile"/>
                    <div className="user-info">
                      <div className="user-info__name">
                        Kevin Olauwefedi Mwangi
                      </div>
                      <div className="user-info__phase">
                        Phase 2 (9 weeks in apprenticeship)
                      </div>
                    </div>
                  </div>

                  <div className="user-statistics">
                    <div className="user-statistic">
                      <div className="user-statistic__label">
                        Fellow skill mastery
                      </div>

                      <div className="user-statistic__value">
                        <img className="user-statistic__icon" src={ArrowDown} alt="Down"/>
                        <div className="user-statistic__main">
                          5
                        </div>
                        <div className="user-statistic__against">
                          /25
                        </div>
                      </div>
                    </div>

                    <div className="user-statistic">
                      <div className="user-statistic__label">
                        Fellow skill readiness
                      </div>

                      <div className="user-statistic__value">
                        <img className="user-statistic__icon" src={ArrowUp} alt="Up"/>

                        <div className="user-statistic__main">
                          10
                        </div>
                        <div className="user-statistic__against">
                          %
                        </div>
                      </div>
                    </div>

                    <div className="user-statistic">
                      <div className="user-statistic__label">
                        Current learning velocity
                      </div>

                      <div className="user-statistic__value">
                        <img className="user-statistic__icon" src={ArrowUp} alt="Up"/>

                        <div className="user-statistic__main">
                          80
                        </div>
                        <div className="user-statistic__against">
                          /wk
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SkillChart/>

                <div className="skills-feed">
                  <div className="skills-filters">
                    <div className="skills-filter">
                      <div className="skills-filter__header">
                        Status
                      </div>

                      <div className="skills-filter__body">
                        <custom-checkbox checked>All</custom-checkbox>
                        <custom-checkbox>In danger</custom-checkbox>
                        <custom-checkbox>In progress</custom-checkbox>
                        <custom-checkbox>Mastered</custom-checkbox>
                      </div>
                    </div>
                    <div className="skills-filter">
                      <div className="skills-filter__header">
                        Stacks
                      </div>

                      <div className="skills-filter__body">
                        <custom-checkbox checked>All</custom-checkbox>
                        <custom-checkbox>ReactJs</custom-checkbox>
                        <custom-checkbox>SASS</custom-checkbox>
                        <custom-checkbox>NodeJS</custom-checkbox>
                        <custom-checkbox disabled>Python</custom-checkbox>
                      </div>
                    </div>
                  </div>

                  <div className="skills-list">
                    <skill-card
                      title="Working with redux sagas"
                      target="10"
                      skill="9"
                      icon={ReactIcon}
                    ></skill-card>

                    <skill-card
                      title="Using SASS pre-processor"
                      target="10"
                      skill="6"
                      icon={SassIcon}
                    ></skill-card>

                    <skill-card
                      title="Building react components"
                      target="80"
                      skill="11"
                      icon={ReactIcon}
                    ></skill-card>

                    <skill-card
                      title="Working on Node controllers"
                      target="15"
                      skill="11"
                      icon={NodeIcon}
                    ></skill-card>

                    <skill-card
                      title="Building middleware for NodeJS"
                      target="10"
                      skill="1"
                      icon={NodeIcon}
                    ></skill-card>

                    <skill-card
                      title="Hooking up NodeJS routes"
                      target="20"
                      skill="11"
                      icon={NodeIcon}
                    ></skill-card>
                  </div>
                </div>
            </Fragment>
        );
    }
}
