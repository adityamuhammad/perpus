import { all, fork} from 'redux-saga/effects';
import * as booksSaga from './books/booksSaga';

export default function* RootSaga(){
  yield all([
    ...Object.values(booksSaga)
  ].map(fork))
}