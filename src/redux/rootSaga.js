import { all, fork} from 'redux-saga/effects';
import * as booksSaga from './books/booksSaga';
import * as membersSaga from './members/membersSaga';

export default function* RootSaga(){
  yield all([
    ...Object.values(booksSaga),
    ...Object.values(membersSaga),
  ].map(fork))
}