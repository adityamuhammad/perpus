import {
  FETCH_BORROWINGS_REQUEST,
  FETCH_BORROWINGS_SUCCESS,
  FETCH_BORROWINGS_FAILURE
} from './borrowingsType';

const initialState = {
  loading: false,
  error: '',
  borrowings: []
}

const borrowingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_BORROWINGS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_BORROWINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        borrowings: action.payload,
        error: ''
      }
    case FETCH_BORROWINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

export default borrowingsReducer;