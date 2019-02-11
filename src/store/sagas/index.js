import { all } from 'redux-saga/effects';

import { watchFetchUsersTeams } from '../sagas/shellSagas';

function* rootSaga() {
  yield all([
    watchFetchUsersTeams()
  ])
}

export default rootSaga;
