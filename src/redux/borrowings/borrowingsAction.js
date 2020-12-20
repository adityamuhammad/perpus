import { 
  FETCH_BORROWINGS_FAILURE, 
  FETCH_BORROWINGS_REQUEST, 
  FETCH_BORROWINGS_SUCCESS, 
  MODAL_BORROWINGS_CLOSE, 
  MODAL_BORROWINGS_OPEN
} from "./borrowingsType"

export const modalBorrowingsOpen = () => {
  return {
    type: MODAL_BORROWINGS_OPEN
  }
}

export const modalBorrowingsClose = () => {
  return {
    type: MODAL_BORROWINGS_CLOSE
  }
}

export const fetchBorrowingsRequest = () => {
  return {
    type: FETCH_BORROWINGS_REQUEST
  }
}

export const fetchBorrowingsSuccess = borrowings => {
  return {
    type: FETCH_BORROWINGS_SUCCESS,
    payload: borrowings
  }
}

export const fetchBorrowingsFailure = error => {
  return {
    type: FETCH_BORROWINGS_FAILURE,
    payload: error
  }
}