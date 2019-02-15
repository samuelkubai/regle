import * as types from '../actionTypes';
import { put, takeLatest, call } from 'redux-saga/effects';
import axios from "axios/index";

import { storeUsersTeams, updateSelectedTeam } from '../actions/shell';
import Container from '../../lib/Container';


export function* fetchUsersTeams(action) {
  const { REACT_APP_API_URL } = process.env;

  try {
    const response = yield call(axios.get, `${REACT_APP_API_URL}/teams`);
    const teams = response.data.data.teams;

    yield put(storeUsersTeams(response.data));

    // First check if in the local storage the selected team was updated
    let team = Container.currentTeam;

    // If not have the first team passed be set as the selected team
    if (team === null) {
      team = teams[0] && teams[0].slug;
    }

    yield put(updateSelectedTeam(team));

    Container.currentTeam = team;
  } catch (error) {
    console.log(`Error while fetching user's teams`, error);
  }
}

export function* watchFetchUsersTeams() {
  yield takeLatest(types.FETCH_USER_TEAMS, fetchUsersTeams);
}
