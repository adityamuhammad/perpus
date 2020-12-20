import { 
  FETCH_MEMBERS_REQUEST, 
  FETCH_MEMBERS_SUCCESS, 
  FETCH_MEMBERS_FAILURE, 
  MODAL_MEMBERS_OPEN, 
  MODAL_MEMBERS_CLOSE,
  SAVE_MEMBERS_REQUEST,
  SAVE_MEMBERS_FAILURE,
  SAVE_MEMBERS_SUCCESS,
  FETCH_MEMBERS_DETAIL_REQUEST,
  FETCH_MEMBERS_DETAIL_SUCCESS,
  FETCH_MEMBERS_DETAIL_FAILURE,
  UPDATE_MEMBERS_REQUEST,
  UPDATE_MEMBERS_SUCCESS,
  UPDATE_MEMBERS_FAILURE,
  CONFIRM_DELETE_MEMBERS_OPEN,
  CONFIRM_DELETE_MEMBERS_CLOSE,
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  DELETE_MEMBERS_FAILURE
} from './membersType';

const initialState = {
  loading: false,
  confirmDeleteOpen: false,
  confirmDeleteId: null,
  modalOpen: false,
  modalType: 'new',
  modalFetchId: null,
  modalButtonSaveEnable: true,
  error: '',
  members: [],
  member: {}
}

const membersReducer = (state = initialState, action) => {
  switch(action.type){
    case CONFIRM_DELETE_MEMBERS_OPEN:
      return {
        ...state,
        confirmDeleteOpen: true,
        confirmDeleteId: action.payload
      }

    case CONFIRM_DELETE_MEMBERS_CLOSE:
      return {
        ...state,
        confirmDeleteOpen: false,
        confirmDeleteId: null
      }

    case MODAL_MEMBERS_OPEN:
      return {
        ...state,
        modalOpen: true,
        modalType: action.payload.modalType,
        modalFetchId: action.payload.modalFetchId,
        modalButtonSaveEnable: true,
      }

    case MODAL_MEMBERS_CLOSE:
      return {
        ...state,
        modalOpen: false,
        modalFetchId: null,
        member: {}
      }

    case FETCH_MEMBERS_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case FETCH_MEMBERS_SUCCESS:
      return {
        loading: false,
        members: action.payload,
        error: null
      }

    case FETCH_MEMBERS_FAILURE:
      return {
        loading: false,
        members: [],
        error: action.payload
      }

    case FETCH_MEMBERS_DETAIL_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }
    
    case FETCH_MEMBERS_DETAIL_SUCCESS:
      return {
        ...state,
        member: action.payload,
        modalButtonSaveEnable: true
      }

    case FETCH_MEMBERS_DETAIL_FAILURE:
      return {
        ...state,
        member: {},
        modalButtonSaveEnable: false
      }

    case SAVE_MEMBERS_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }

    case SAVE_MEMBERS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    case SAVE_MEMBERS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true,
        error: action.payload
      }

    case UPDATE_MEMBERS_REQUEST:
      return {
        ...state,
        modalButtonSaveEnable: false
      }

    case UPDATE_MEMBERS_SUCCESS:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true
      }

    case UPDATE_MEMBERS_FAILURE:
      return {
        ...state,
        modalOpen: false,
        modalButtonSaveEnable: true,
        error: action.payload
      }

    case DELETE_MEMBERS_REQUEST:
      return {
        ...state,
        confirmDeleteOpen: false
      }

    case DELETE_MEMBERS_SUCCESS:
      return {
        ...state,
        confirmDeleteOpen: false,
        confirmDeleteId: null,
      }

    case DELETE_MEMBERS_FAILURE:
      return {
        ...state,
        confirmDeleteOpen: false,
        confirmDeleteId: null,
        error: action.payload
      }

    default:
      return state
  }
}

export default membersReducer;