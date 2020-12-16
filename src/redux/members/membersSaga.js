import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  deleteMembersFailure,
  deleteMembersSuccess,
  fetchMembersDetailFailure,
  fetchMembersDetailSuccess,
  fetchMembersFailure, 
  fetchMembersSuccess, 
  saveMembersFailure, 
  saveMembersSuccess, 
  updateMembersFailure, 
  updateMembersSuccess
} from './membersAction'
import { 
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  FETCH_MEMBERS_DETAIL_REQUEST, 
  FETCH_MEMBERS_REQUEST, 
  SAVE_MEMBERS_REQUEST, 
  SAVE_MEMBERS_SUCCESS, 
  UPDATE_MEMBERS_REQUEST, 
  UPDATE_MEMBERS_SUCCESS
} from './membersType';

function* fetchMembersRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/members/";
    const response = yield call(() => axios.get(url));
    yield put(fetchMembersSuccess(response.data))
  } catch (error) {
    yield put(fetchMembersFailure('something went wrong.'))
  }
}

function* fetchMembersDetailRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/members/${action.payload}`;
    const response = yield call(() => axios.get(url));
    yield put(fetchMembersDetailSuccess(response.data))
  } catch (error) {
    yield put(fetchMembersDetailFailure('something went wrong.'))
  }
}

function* saveMembersRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/members";
    yield call(() => axios.post(url, action.payload));
    yield put(saveMembersSuccess())
  } catch (error) {
    yield put(saveMembersFailure('something went wrong.'))
  }
}

function* updateMembersRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/members/${action.payload.id}`;
    yield call(() => axios.put(url, action.payload.member));
    yield put(updateMembersSuccess())
  } catch (error) {
    yield put(updateMembersFailure('something went wrong.'))
  }
}

function* deleteMembersRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/members/${action.payload}`;
    yield call(() => axios.delete(url));
    yield put(deleteMembersSuccess())
  } catch (error) {
    yield put(deleteMembersFailure('something went wrong.'))
  }
}

export function* watchUpdateMembers(){
  yield takeEvery(UPDATE_MEMBERS_REQUEST, updateMembersRequestAsync);
}
export function* watchDeleteMembers(){
  yield takeEvery(DELETE_MEMBERS_REQUEST, deleteMembersRequestAsync);
}
export function* watchSaveMembers(){
  yield takeEvery(SAVE_MEMBERS_REQUEST, saveMembersRequestAsync);
}
export function* watchFetchMembers(){
  yield takeEvery(FETCH_MEMBERS_REQUEST, fetchMembersRequestAsync);
}
export function* watchFetchMembersDetail(){
  yield takeEvery(FETCH_MEMBERS_DETAIL_REQUEST, fetchMembersDetailRequestAsync);
}
export function* watchFetchMembersAfterSave(){
  yield takeEvery(SAVE_MEMBERS_SUCCESS, fetchMembersRequestAsync);
}
export function* watchFetchMembersAfterUpdate(){
  yield takeEvery(UPDATE_MEMBERS_SUCCESS, fetchMembersRequestAsync);
}
export function* watchFetchMembersAfterDelete(){
  yield takeEvery(DELETE_MEMBERS_SUCCESS, fetchMembersRequestAsync);
}