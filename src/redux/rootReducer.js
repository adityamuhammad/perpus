import { combineReducers } from 'redux';
import booksReducer from './books/booksReducer'
import membersReducer from './members/membersReducer'


const rootReducer = combineReducers({
  booksReducer,
  membersReducer
})

export default rootReducer;