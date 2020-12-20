import { 
  CONFIRM_DELETE_BOOKS_CLOSE,
  CONFIRM_DELETE_BOOKS_OPEN,
  DELETE_BOOKS_FAILURE,
  DELETE_BOOKS_REQUEST,
  DELETE_BOOKS_SUCCESS,
  FETCH_BOOKS_DETAIL_FAILURE,
  FETCH_BOOKS_DETAIL_REQUEST,
  FETCH_BOOKS_DETAIL_SUCCESS,
  FETCH_BOOKS_FAILURE, 
  FETCH_BOOKS_REQUEST, 
  FETCH_BOOKS_SUCCESS, 
  MODAL_BOOKS_CLOSE, 
  MODAL_BOOKS_OPEN, 
  SAVE_BOOKS_FAILURE, 
  SAVE_BOOKS_REQUEST,
  SAVE_BOOKS_SUCCESS,
  UPDATE_BOOKS_FAILURE,
  UPDATE_BOOKS_REQUEST,
  UPDATE_BOOKS_SUCCESS
} from "./booksType"

export const confirmDeleteBooksOpen = (id) => {
  return {
    type: CONFIRM_DELETE_BOOKS_OPEN,
    payload: id
  }
}

export const confirmDeleteBooksClose = () => {
  return {
    type: CONFIRM_DELETE_BOOKS_CLOSE
  }
}

export const modalBooksOpen = (payload = null) => {
  return {
    type: MODAL_BOOKS_OPEN,
    payload: payload
  }
}

export const modalBooksClose = () => {
  return {
    type: MODAL_BOOKS_CLOSE
  }
}

export const deleteBooksRequest = (id) => {
  return {
    type: DELETE_BOOKS_REQUEST,
    payload: id
  }
}

export const deleteBooksSuccess = () => {
  return {
    type: DELETE_BOOKS_SUCCESS
  }
}

export const deleteBooksFailure = (error) => {
  return {
    type: DELETE_BOOKS_FAILURE,
    payload: error
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

export const updateBooksRequest = (book) => {
  return {
    type: UPDATE_BOOKS_REQUEST,
    payload: book
  }
}

export const updateBooksSuccess = () => {
  return {
    type: UPDATE_BOOKS_SUCCESS
  }
}

export const updateBooksFailure = (error) => {
  return {
    type: UPDATE_BOOKS_FAILURE,
    payload: error
  }
}

export const fetchBooksDetailRequest = (id) => {
  return {
    type: FETCH_BOOKS_DETAIL_REQUEST,
    payload: id
  }
}

export const fetchBooksDetailSuccess = (book) => {
  return {
    type: FETCH_BOOKS_DETAIL_SUCCESS,
    payload: book
  }
}

export const fetchBooksDetailFailure = (error) => {
  return {
    type: FETCH_BOOKS_DETAIL_FAILURE,
    payload: error
  }
}

export const fetchBooksRequest = (params) => {
  return {
    type: FETCH_BOOKS_REQUEST,
    payload: params
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