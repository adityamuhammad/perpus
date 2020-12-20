import {
  FETCH_BORROWINGS_REQUEST,
  FETCH_BORROWINGS_SUCCESS,
  FETCH_BORROWINGS_FAILURE,
  MODAL_BORROWINGS_OPEN,
  MODAL_BORROWINGS_CLOSE
} from './borrowingsType';

const initialState = {
  loading: false,
  error: '',
  borrowings: [],
  modalOpen: false,
  modalButtonSaveEnable: true,
}

const borrowingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case MODAL_BORROWINGS_OPEN:
      return {
        ...state,
        modalOpen: true,
        modalButtonSaveEnable: true
      }
    case MODAL_BORROWINGS_CLOSE:
      return {
        ...state,
        modalOpen: false,
      }
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