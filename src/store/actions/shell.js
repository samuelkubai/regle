import * as types from '../actionTypes';

export const fetchUserTeams = (data) => {
  return {
    type: types.FETCH_USER_TEAMS,
    data
  }
};

export const storeUsersTeams = (response) => {
  return {
    type: types.UPDATE_TEAM_LIST,
    response
  }
};

export const updateSelectedTeam = (team) => {
  return {
    type: types.UPDATE_SELECTED_TEAM,
    data: {
      team
    }
  }
};
