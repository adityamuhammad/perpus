import { combineReducers } from 'redux';
import booksReducer from './books/booksReducer'


const rootReducer = combineReducers({
  booksReducer
})

export default rootReducer;