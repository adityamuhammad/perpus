import { 
  CONFIRM_DELETE_MEMBERS_CLOSE,
  CONFIRM_DELETE_MEMBERS_OPEN,
  DELETE_MEMBERS_FAILURE,
  DELETE_MEMBERS_REQUEST,
  DELETE_MEMBERS_SUCCESS,
  FETCH_MEMBERS_DETAIL_FAILURE,
  FETCH_MEMBERS_DETAIL_REQUEST,
  FETCH_MEMBERS_DETAIL_SUCCESS,
  FETCH_MEMBERS_FAILURE, 
  FETCH_MEMBERS_REQUEST, 
  FETCH_MEMBERS_SUCCESS, 
  MODAL_MEMBERS_CLOSE, 
  MODAL_MEMBERS_OPEN, 
  SAVE_MEMBERS_FAILURE, 
  SAVE_MEMBERS_REQUEST,
  SAVE_MEMBERS_SUCCESS,
  UPDATE_MEMBERS_FAILURE,
  UPDATE_MEMBERS_REQUEST,
  UPDATE_MEMBERS_SUCCESS
} from "./membersType"

export const confirmDeleteMembersOpen = (id) => {
  return {
    type: CONFIRM_DELETE_MEMBERS_OPEN,
    payload: id
  }
}

export const confirmDeleteMembersClose = () => {
  return {
    type: CONFIRM_DELETE_MEMBERS_CLOSE
  }
}

export const modalMembersOpen = (payload = null) => {
  return {
    type: MODAL_MEMBERS_OPEN,
    payload: payload
  }
}

export const modalMembersClose = () => {
  return {
    type: MODAL_MEMBERS_CLOSE
  }
}

export const deleteMembersRequest = (id) => {
  return {
    type: DELETE_MEMBERS_REQUEST,
    payload: id
  }
}

export const deleteMembersSuccess = () => {
  return {
    type: DELETE_MEMBERS_SUCCESS
  }
}

export const deleteMembersFailure = (error) => {
  return {
    type: DELETE_MEMBERS_FAILURE,
    payload: error
  }
}

export const saveMembersRequest = (book) => {
  return {
    type: SAVE_MEMBERS_REQUEST,
    payload: book
  }
}

export const saveMembersSuccess = () => {
  return {
    type: SAVE_MEMBERS_SUCCESS
  }
}

export const saveMembersFailure = (error) => {
  return {
    type: SAVE_MEMBERS_FAILURE,
    payload: error
  }
}

export const updateMembersRequest = (book) => {
  return {
    type: UPDATE_MEMBERS_REQUEST,
    payload: book
  }
}

export const updateMembersSuccess = () => {
  return {
    type: UPDATE_MEMBERS_SUCCESS
  }
}

export const updateMembersFailure = (error) => {
  return {
    type: UPDATE_MEMBERS_FAILURE,
    payload: error
  }
}

export const fetchMembersDetailRequest = (id) => {
  return {
    type: FETCH_MEMBERS_DETAIL_REQUEST,
    payload: id
  }
}

export const fetchMembersDetailSuccess = (book) => {
  return {
    type: FETCH_MEMBERS_DETAIL_SUCCESS,
    payload: book
  }
}

export const fetchMembersDetailFailure = (error) => {
  return {
    type: FETCH_MEMBERS_DETAIL_FAILURE,
    payload: error
  }
}

export const fetchMembersRequest = (params) => {
  return {
    type: FETCH_MEMBERS_REQUEST,
    payload: params
  }
}

export const fetchMembersSuccess = (books) => {
  return {
    type: FETCH_MEMBERS_SUCCESS,
    payload: books
  }
}

export const fetchMembersFailure = (error) => {
  return {
    type: FETCH_MEMBERS_FAILURE,
    payload: error
  }
}