import { 
  FETCH_BORROWINGS_FAILURE, 
  FETCH_BORROWINGS_REQUEST, 
  FETCH_BORROWINGS_SUCCESS 
} from "./borrowingsType"

export const fetchBorrowingsRequest = () => {
  return {
    type: FETCH_BORROWINGS_REQUEST
  }
}

export const fetchBorrowingsSuccess = (borrowings) => {
  return {
    type: FETCH_BORROWINGS_SUCCESS,
    payload: borrowings
  }
}

export const fetchBorrowingsFailure = (error) => {
  return {
    type: FETCH_BORROWINGS_FAILURE,
    payload: error
  }
}