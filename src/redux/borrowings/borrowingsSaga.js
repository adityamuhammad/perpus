import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
  fetchBorrowingsSuccess,
  fetchBorrowingsFailure,
  saveBorrowingsSuccess,
  saveBorrowingsFailure,
  returnBorrowingsSuccess,
  returnBorrowingsFailure
} from './borrowingsAction';
import { FETCH_BORROWINGS_REQUEST, RETURN_BORROWINGS_REQUEST, RETURN_BORROWINGS_SUCCESS, SAVE_BORROWINGS_REQUEST, SAVE_BORROWINGS_SUCCESS } from './borrowingsType';

function* fetchBorrowingsRequestAsync(action){
  try {
    const params = action.payload;
    const url = "https://localhost:5001/api/books/borrowing";
    const response = yield call(() => axios.get(url, {params}));
    yield put(fetchBorrowingsSuccess(response.data))
  } catch (error) {
    yield put(fetchBorrowingsFailure('something went wrong.'))
  }
}
function* saveBorrowingsRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/books/borrow";
    yield call(() => axios.post(url, action.payload));
    yield put(saveBorrowingsSuccess())
  } catch (error) {
    yield put(saveBorrowingsFailure('something went wrong.'))
  }
}

function* returnBorrowingsRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/books/return/${action.payload}`;
    yield call(() => axios.post(url));
    yield put(returnBorrowingsSuccess())
  } catch (error) {
    yield put(returnBorrowingsFailure('something went wrong.'))
  }
}


export function* watchFetchBorrowings(){
  yield takeEvery(FETCH_BORROWINGS_REQUEST, fetchBorrowingsRequestAsync);
}

export function* watchSaveBorrowings(){
  yield takeEvery(SAVE_BORROWINGS_REQUEST, saveBorrowingsRequestAsync);
}

export function* watchReturnBorrowings(){
  yield takeEvery(RETURN_BORROWINGS_REQUEST, returnBorrowingsRequestAsync);
}

export function* watchFetchBorrowingsAfterSave(){
  yield takeEvery(SAVE_BORROWINGS_SUCCESS, fetchBorrowingsRequestAsync);
}
export function* watchFetchBorrowingsAfterReturn(){
  yield takeEvery(RETURN_BORROWINGS_SUCCESS, fetchBorrowingsRequestAsync);
}