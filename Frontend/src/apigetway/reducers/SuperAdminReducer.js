import {
  SUPERADMIN_LOGIN_FAIL,
  SUPERADMIN_LOGOUT,
  SUPERADMIN_LOGIN_REQUEST,
  SUPERADMIN_LOGIN_SUCESS,
} from '../constants/SuperAdminConstants';

export const superAdminLoginReducer = (state = {},action ) => {
  switch (action.type) {
    case SUPERADMIN_LOGIN_REQUEST:
      return { loading: true };
    case SUPERADMIN_LOGIN_SUCESS:
      return { loading: false, superAdminInfo: action.playload, errs: false };
    case SUPERADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload, errs: true };
    case SUPERADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};
