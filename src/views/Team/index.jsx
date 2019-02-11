import React, { Component, Fragment } from 'react';
import Container from '../../lib/Container';

// Import the team's components
import MembersList from '../../components/MembersList';
import MemberDetail from '../../components/MemberDetail';

// Import styles
import './style.css'

export default class Team extends Component {
  state = {
    selectedMember: void 0
  };

  componentDidMount() {
    this.selectMember(this.props.match.params.email);
  }

  selectMember = (email) => {
    this.setState(state => {
      return {
        ...state,
        selectedMember: email
      };
    });


    if (this.props.match.params.email !== email) {
      this.redirect(`/teams/${Container.currentTeam}/members/${email}`)
    }
  };

  redirect = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { selectedMember } = this.state;
    const customProps = {
      ...this.props,
      selectedMember,
      selectMember: this.selectMember
    };

    return (
      <Fragment>
        <div className="pg-team__container">
          <div className="pg-team__stroke"></div>
          <MembersList {...customProps} />
          <MemberDetail {...customProps}/>
        </div>
      </Fragment>
    );
  }
}
