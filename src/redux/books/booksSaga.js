import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { 
  deleteBooksFailure,
  deleteBooksSuccess,
  fetchBooksDetailFailure,
  fetchBooksDetailSuccess,
  fetchBooksFailure, 
  fetchBooksSuccess, 
  saveBooksFailure, 
  saveBooksSuccess, 
  updateBooksFailure, 
  updateBooksSuccess
} from './booksAction'
import { 
  DELETE_BOOKS_REQUEST,
  DELETE_BOOKS_SUCCESS,
  FETCH_BOOKS_DETAIL_REQUEST, 
  FETCH_BOOKS_REQUEST, 
  SAVE_BOOKS_REQUEST, 
  SAVE_BOOKS_SUCCESS, 
  UPDATE_BOOKS_REQUEST, 
  UPDATE_BOOKS_SUCCESS
} from './booksType';

function* fetchBooksRequestAsync(action){
  try {
    const params = action.payload;
    const url = "https://localhost:5001/api/books";
    const response = yield call(() => axios.get(url, {params}));
    yield put(fetchBooksSuccess(response.data));
  } catch (error) {
    yield put(fetchBooksFailure('something went wrong.'));
  }
}

function* fetchBooksDetailRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/books/${action.payload}`;
    const response = yield call(() => axios.get(url));
    yield put(fetchBooksDetailSuccess(response.data))
  } catch (error) {
    yield put(fetchBooksDetailFailure('something went wrong.'))
  }
}

function* saveBooksRequestAsync(action){
  try {
    const url = "https://localhost:5001/api/books";
    yield call(() => axios.post(url, action.payload));
    yield put(saveBooksSuccess())
  } catch (error) {
    yield put(saveBooksFailure('something went wrong.'))
  }
}

function* updateBooksRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/books/${action.payload.id}`;
    yield call(() => axios.put(url, action.payload.book));
    yield put(updateBooksSuccess())
  } catch (error) {
    yield put(updateBooksFailure('something went wrong.'))
  }
}

function* deleteBooksRequestAsync(action){
  try {
    const url = `https://localhost:5001/api/books/${action.payload}`;
    yield call(() => axios.delete(url));
    yield put(deleteBooksSuccess())
  } catch (error) {
    yield put(deleteBooksFailure('something went wrong.'))
  }
}

export function* watchUpdateBooks(){
  yield takeEvery(UPDATE_BOOKS_REQUEST, updateBooksRequestAsync);
}
export function* watchDeleteBooks(){
  yield takeEvery(DELETE_BOOKS_REQUEST, deleteBooksRequestAsync);
}
export function* watchSaveBooks(){
  yield takeEvery(SAVE_BOOKS_REQUEST, saveBooksRequestAsync);
}
export function* watchFetchBooks(){
  yield takeEvery(FETCH_BOOKS_REQUEST, fetchBooksRequestAsync);
}
export function* watchFetchBooksDetail(){
  yield takeEvery(FETCH_BOOKS_DETAIL_REQUEST, fetchBooksDetailRequestAsync);
}
export function* watchFetchBooksAfterSave(){
  yield takeEvery(SAVE_BOOKS_SUCCESS, fetchBooksRequestAsync);
}
export function* watchFetchBooksAfterUpdate(){
  yield takeEvery(UPDATE_BOOKS_SUCCESS, fetchBooksRequestAsync);
}
export function* watchFetchBooksAfterDelete(){
  yield takeEvery(DELETE_BOOKS_SUCCESS, fetchBooksRequestAsync);
}