import { 
  FETCH_BOOKS_FAILURE, 
  FETCH_BOOKS_REQUEST, 
  FETCH_BOOKS_SUCCESS, 
  MODAL_BOOKS_CLOSE, 
  MODAL_BOOKS_OPEN, 
  SAVE_BOOKS_FAILURE, 
  SAVE_BOOKS_REQUEST,
  SAVE_BOOKS_SUCCESS
} from "./booksType"

export const modalBooksOpen = () => {
  return {
    type: MODAL_BOOKS_OPEN
  }
}
export const modalBooksClose = () => {
  return {
    type: MODAL_BOOKS_CLOSE
  }
}
export const saveBooksRequest = (book) => {
  return {
    type: SAVE_BOOKS_REQUEST,
    payload: book
  }
}
export const saveBooksSuccess = () => {
  return {
    type: SAVE_BOOKS_SUCCESS
  }
}
export const saveBooksFailure = (error) => {
  return {
    type: SAVE_BOOKS_FAILURE,
    payload: error
  }
}
export const fetchBooksRequest = () => {
  return {
    type: FETCH_BOOKS_REQUEST
  }
}

export const fetchBooksSuccess = (books) => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: books
  }
}

export const fetchBooksFailure = (error) => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error
  }
}