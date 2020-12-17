import { combineReducers } from 'redux';
import booksReducer from './books/booksReducer';
import membersReducer from './members/membersReducer';
import borrowingsReducer from './borrowings/borrowingsReducer';


const rootReducer = combineReducers({
  booksReducer,
  membersReducer,
  borrowingsReducer,
})

export default rootReducer;