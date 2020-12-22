import {
  FETCH_BORROWINGS_REQUEST,
  FETCH_BORROWINGS_SUCCESS,
  FETCH_BORROWINGS_FAILURE,
  MODAL_BORROWINGS_OPEN,
  MODAL_BORROWINGS_CLOSE,
  SAVE_BORROWINGS_REQUEST,
  SAVE_BORROWINGS_FAILURE,
  SAVE_BORROWINGS_SUCCESS,
  CONFIRM_RETURN_BORROWINGS_OPEN,
  CONFIRM_RETURN_BORROWINGS_CLOSE,
  RETURN_BORROWINGS_REQUEST,
  RETURN_BORROWINGS_SUCCESS,
  RETURN_BORROWINGS_FAILURE
}
from './borrowingsType';
const initialState = {
  loading: false,
  error: '',
  confirmReturnOpen: false,
  confirmReturnId: null,
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
    case CONFIRM_RETURN_BORROWINGS_OPEN:
      return {
        ...state,
        confirmReturnOpen: true,
        confirmReturnId: action.payload
      }
    case CONFIRM_RETURN_BORROWINGS_CLOSE:
      return {
        ...state,
        confirmReturnOpen: false,
        confirmReturnId: null
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
    case SAVE_BORROWINGS_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false,

      }
    case SAVE_BORROWINGS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true,
      }
    case SAVE_BORROWINGS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true,
        error: action.payload
      }
    case RETURN_BORROWINGS_REQUEST:
      return {
        ...state,
      }

    case RETURN_BORROWINGS_SUCCESS:
      return {
        ...state,
        confirmReturnOpen: false,
        confirmReturnId: null,
      }

    case RETURN_BORROWINGS_FAILURE:
      return {
        ...state,
        confirmReturnOpen: false,
        confirmReturnId: null,
        error: action.payload
      }
    default:
      return state
  }
}

export default borrowingsReducer;