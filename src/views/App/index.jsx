import React, {Component, Fragment} from 'react';

import '../../components/custom-elements/NavBar/index';


import FellowStatsBanner from "../../components/FellowStatsBanner";
import FellowSkillsBreakdown from "../../components/FellowSkillsBreakdown";

import ArrowRight from '../../assets/arrow-pointing-to-right.svg';
import CaretDown from '../../assets/caret-down.svg';
import ProfileImage from '../../assets/regle-profile.png';

import './style.css';

export default class App extends Component {
  render() {
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

        <FellowStatsBanner/>

        <FellowSkillsBreakdown/>
      </Fragment>
    );
  }
}
