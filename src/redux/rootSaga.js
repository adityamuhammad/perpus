import { all, fork} from 'redux-saga/effects';
import * as booksSaga from './books/booksSaga';
import * as membersSaga from './members/membersSaga';
import * as borrowingsSaga from './borrowings/borrowingsSaga';

export default function* RootSaga(){
  yield all([
    ...Object.values(booksSaga),
    ...Object.values(membersSaga),
    ...Object.values(borrowingsSaga),
  ].map(fork))
}