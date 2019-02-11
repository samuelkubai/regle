import * as types from '../actionTypes';
import { put, takeLatest, call } from 'redux-saga/effects';
import axios from "axios/index";
import { storeUsersTeams } from '../actions/shell';


export function* fetchUsersTeams(action) {
  const { REACT_APP_API_URL } = process.env;

  try {
    const response = yield call(axios.get, `${REACT_APP_API_URL}/teams`);
    yield put(storeUsersTeams(response.data));
  } catch (error) {
    console.log(`Error while fetching user's teams`, error);
  }
}

export function* watchFetchUsersTeams() {
  yield takeLatest(types.FETCH_USER_TEAMS, fetchUsersTeams);
}
