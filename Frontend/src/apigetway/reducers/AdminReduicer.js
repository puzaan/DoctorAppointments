import { ADMIN_CREATE_FAIL, ADMIN_CREATE_REQUEST, ADMIN_CREATE_RESET, ADMIN_CREATE_SUCCESS, ADMIN_DELETE_FAIL, ADMIN_DELETE_REQUEST, ADMIN_DELETE_SUCCESS, ADMIN_DETAILS_FAIL, ADMIN_DETAILS_REQUEST, ADMIN_DETAILS_RESET, ADMIN_DETAILS_SUCCESS, ADMIN_LIST_FAIL, ADMIN_LIST_REQUEST, ADMIN_LIST_RESET, ADMIN_LIST_SUCCESS, ADMIN_LOGIN_FAIL, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCESS, ADMIN_LOGOUT, ADMIN_PASSWORD_CHANGE_FAIL, ADMIN_PASSWORD_CHANGE_REQUEST, ADMIN_PASSWORD_CHANGE_RESET, ADMIN_PASSWORD_CHANGE_SUCCESS, ADMIN_UPDATE_FAIL, ADMIN_UPDATE_REQUEST, ADMIN_UPDATE_RESET, ADMIN_UPDATE_SUCCESS } from "../constants/AdminConstants";

export const AdminCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_CREATE_SUCCESS:
      return { loading: false, success: true, adminInfo: action.payload };
    case ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const AdminListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_REQUEST:
      return { loading: true, admins: [] };
    case ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        admins: action.payload,
      };
    case ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LIST_RESET:
      return { admins: [] };
    default:
      return state;
  }
};


export const AdminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AdminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true, AdminInfo: action.payload };
    case ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};


export const AdminDetailsReducer = (state = { admin: {} }, action) => {
  switch (action.type) {
    case ADMIN_DETAILS_REQUEST :
      return { ...state, loading: true, admin: {} };
    case ADMIN_DETAILS_SUCCESS:
      return { loading: false,success: true, admin: action.payload };
    case ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_DETAILS_RESET:
      return { admin: {} };
    default:
      return state;
  }
};

export const AdminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCESS:
      return { loading: false, adminInfo: action.playload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload};
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};


export const AdminPasswordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case ADMIN_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, success: true, adminPasswordInfo: action.payload };
    case ADMIN_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_PASSWORD_CHANGE_RESET:
      return {};
    default:
      return state;
  }
};