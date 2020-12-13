import { 
  FETCH_BOOKS_REQUEST, 
  FETCH_BOOKS_SUCCESS, 
  FETCH_BOOKS_FAILURE, 
  MODAL_BOOKS_OPEN, 
  MODAL_BOOKS_CLOSE,
  SAVE_BOOKS_REQUEST,
  SAVE_BOOKS_FAILURE,
  SAVE_BOOKS_SUCCESS
} from './booksType';

const initialState = {
  loading: false,
  modalOpen: false,
  buttonSaveEnable: true,
  error: '',
  books: []
}

const booksReducer = (state = initialState, action) => {
  switch(action.type){
    case MODAL_BOOKS_OPEN:
      return {
        ...state,
        modalOpen: true
      }
    case MODAL_BOOKS_CLOSE:
      return {
        ...state,
        modalOpen: false
      }
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload,
        error: null
      }
    case FETCH_BOOKS_FAILURE:
      return {
        loading: false,
        books: [],
        error: action.payload
      }
    case SAVE_BOOKS_REQUEST:
      return {
        ...state,
        buttonSaveEnable: false
      }

    case SAVE_BOOKS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        buttonSaveEnable: true
      }

    case SAVE_BOOKS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        buttonSaveEnable: true
      }

    default:
      return state
  }
}

export default booksReducer;