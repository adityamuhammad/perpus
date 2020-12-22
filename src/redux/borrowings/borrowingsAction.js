import { 
  FETCH_BORROWINGS_FAILURE, 
  FETCH_BORROWINGS_REQUEST, 
  FETCH_BORROWINGS_SUCCESS, 
  MODAL_BORROWINGS_CLOSE, 
  MODAL_BORROWINGS_OPEN,
  SAVE_BORROWINGS_FAILURE,
  SAVE_BORROWINGS_REQUEST,
  SAVE_BORROWINGS_SUCCESS,
  CONFIRM_RETURN_BORROWINGS_OPEN,
  CONFIRM_RETURN_BORROWINGS_CLOSE,
  RETURN_BORROWINGS_REQUEST,
  RETURN_BORROWINGS_SUCCESS,
  RETURN_BORROWINGS_FAILURE
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

export const confirmReturnBorrowingsOpen = (id) => {
  return {
    type: CONFIRM_RETURN_BORROWINGS_OPEN,
    payload: id
  }
}

export const confirmReturnBorrowingsClose = () => {
  return {
    type: CONFIRM_RETURN_BORROWINGS_CLOSE,
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

export const saveBorrowingsRequest = (borrowing) => {
  return {
    type: SAVE_BORROWINGS_REQUEST,
    payload: borrowing
  }
}

export const saveBorrowingsSuccess = borrowings => {
  return {
    type: SAVE_BORROWINGS_SUCCESS,
    payload: borrowings
  }
}

export const saveBorrowingsFailure = error => {
  return {
    type: SAVE_BORROWINGS_FAILURE,
    payload: error
  }
}

export const returnBorrowingsRequest = (id) => {
  return {
    type: RETURN_BORROWINGS_REQUEST,
    payload: id
  }
}

export const returnBorrowingsSuccess = () => {
  return {
    type: RETURN_BORROWINGS_SUCCESS
  }
}

export const returnBorrowingsFailure = (error) => {
  return {
    type: RETURN_BORROWINGS_FAILURE,
    payload: error
  }
}