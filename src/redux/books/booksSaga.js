import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  fetchBooksFailure, 
  fetchBooksSuccess, 
  saveBooksFailure, 
  saveBooksSuccess 
} from './booksAction'
import { FETCH_BOOKS_REQUEST, SAVE_BOOKS_REQUEST, SAVE_BOOKS_SUCCESS } from './booksType';

function* fetchBooksRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/books/";
    const response = yield call(() => axios.get(url));
    yield put(fetchBooksSuccess(response.data))
  } catch (error) {
    yield put(fetchBooksFailure('something went wrong.'))
  }
}

function* saveBooksRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/books";
    yield call(() => axios.post(url, { ...action.payload, publisheddate: action.payload.published_date}));
    yield put(saveBooksSuccess())
  } catch (error) {
    yield put(saveBooksFailure('something went wrong.'))
  }
}

export function* watchFetchBooks(){
  yield takeEvery(FETCH_BOOKS_REQUEST, fetchBooksRequestAsync);
}

export function* watchFetchBooksAfterSave(){
  yield takeEvery(SAVE_BOOKS_SUCCESS, fetchBooksRequestAsync);
}
export function* watchSaveBooks(){
  yield takeEvery(SAVE_BOOKS_REQUEST, saveBooksRequestAsync);
}