import { 
  FETCH_BOOKS_REQUEST, 
  FETCH_BOOKS_SUCCESS, 
  FETCH_BOOKS_FAILURE, 
  MODAL_BOOKS_OPEN, 
  MODAL_BOOKS_CLOSE,
  SAVE_BOOKS_REQUEST,
  SAVE_BOOKS_FAILURE,
  SAVE_BOOKS_SUCCESS,
  FETCH_BOOKS_DETAIL_REQUEST,
  FETCH_BOOKS_DETAIL_SUCCESS,
  FETCH_BOOKS_DETAIL_FAILURE,
  UPDATE_BOOKS_REQUEST,
  UPDATE_BOOKS_SUCCESS,
  UPDATE_BOOKS_FAILURE
} from './booksType';

const initialState = {
  loading: false,
  modalOpen: false,
  modalType: 'new',
  modalFetchId: null,
  modalButtonSaveEnable: true,
  error: '',
  books: [],
  book: {}
}

const booksReducer = (state = initialState, action) => {
  switch(action.type){
    case MODAL_BOOKS_OPEN:
      return {
        ...state,
        modalOpen: true,
        modalType: action.payload.modalType,
        modalFetchId: action.payload.modalFetchId,
        modalButtonSaveEnable: true,
      }

    case MODAL_BOOKS_CLOSE:
      return {
        ...state,
        modalOpen: false,
        modalFetchId: null,
        modalType: 'new',
        modalButtonSaveEnable: true,
        book: {}
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

    case FETCH_BOOKS_DETAIL_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }
    
    case FETCH_BOOKS_DETAIL_SUCCESS:
      return {
        ...state,
        book: action.payload,
        modalButtonSaveEnable: true
      }

    case FETCH_BOOKS_DETAIL_FAILURE:
      return {
        ...state,
        book: {},
        modalButtonSaveEnable: false
      }

    case SAVE_BOOKS_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }

    case SAVE_BOOKS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    case SAVE_BOOKS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    case UPDATE_BOOKS_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }

    case UPDATE_BOOKS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    case UPDATE_BOOKS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    default:
      return state
  }
}

export default booksReducer;