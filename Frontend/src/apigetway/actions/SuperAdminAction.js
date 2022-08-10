import axios from 'axios';
import {
  SUPERADMIN_LOGIN_FAIL,
  SUPERADMIN_LOGOUT,
  SUPERADMIN_LOGIN_REQUEST,
  SUPERADMIN_LOGIN_SUCESS,
} from '../constants/SuperAdminConstants';
import url from '../mainUrl';

export const Login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: SUPERADMIN_LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${url}/api/v1/super/admin/login`, {
      username,
      password,
    });
    dispatch({
      type: SUPERADMIN_LOGIN_SUCESS,
      playload: data,
    });
    // to save SUPERADMIN info into local storage
    localStorage.setItem('superAdminInfo', JSON.stringify(data));
    // console.log(data);
  } catch (err) {
    dispatch({
      type: SUPERADMIN_LOGIN_FAIL,
      payload: err.response && err.response.data.message ? err.response.data.message : err.message,
    });
  }
};

export const Logout = () => (dispatch) => {
  localStorage.removeItem('superAdminInfo');
  dispatch({ type: SUPERADMIN_LOGOUT });
  document.location.href = '/superadmin/login';
};
