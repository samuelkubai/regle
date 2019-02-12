import * as types from '../actionTypes';

const initialState = {
  selectedTeam: 'travela',
  teams: []
};

const shell = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TEAM_LIST:
      return {
        ...state,
        teams: action.response.data.teams,
        team__meta: action.response.meta,
        teams__loaded: true
      };
    case  types.UPDATE_SELECTED_TEAM:
      return {
        ...state,
        selectedTeam: action.data.team
      };
    default: return state;
  }
};

export default shell;