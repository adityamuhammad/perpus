import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import {
  fetchBorrowingsSuccess,
  fetchBorrowingsFailure
} from './borrowingsAction';
import { FETCH_BORROWINGS_REQUEST } from './borrowingsType';

function* fetchBorrowingsRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/books/borrowing";
    const response = yield call(() => axios.get(url));
    yield put(fetchBorrowingsSuccess(response.data))
  } catch (error) {
    yield put(fetchBorrowingsFailure('something went wrong.'))
  }
}

export function* watchFetchBorrowings(){
  yield takeEvery(FETCH_BORROWINGS_REQUEST, fetchBorrowingsRequestAsync);
}