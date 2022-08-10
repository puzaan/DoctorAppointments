import axios from 'axios';
import { ADMIN_LOGOUT } from '../constants/AdminConstants';
import {
  BOOKING_APPROVED_FAIL,
  BOOKING_APPROVED_REQUEST,
  BOOKING_APPROVED_SUCESS,
  BOOKING_CALCEL_FAIL,
  BOOKING_CALCEL_REQUEST,
  BOOKING_CALCEL_SUCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
} from '../constants/BookingConstants';
import { DOCTOR_LOGOUT } from '../constants/DoctorConstants';
import { SUPERADMIN_LOGOUT } from '../constants/SuperAdminConstants';
import url from '../mainUrl';

export const AdminLogout = () => (dispatch) => {
  localStorage.removeItem('adminInfo');
  dispatch({ type: ADMIN_LOGOUT });
  document.location.href = '/admin/login';
};
export const SuperAdminLogout = () => (dispatch) => {
  localStorage.removeItem('superAdminInfo');
  dispatch({ type: SUPERADMIN_LOGOUT });
  document.location.href = '/superadmin/login';
};
export const DoctorLogout = () => (dispatch) => {
  localStorage.removeItem('doctorInfo');
  dispatch({ type: DOCTOR_LOGOUT });
  document.location.href = '/doctor/login';
};
export const ListBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_LIST_REQUEST });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${url}/api/v1/booking/view/all`, config);

    dispatch({
      type: BOOKING_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: message,
    });
  }
};

export const AdminListBookings = () => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${url}/api/v1/booking/view/all`, config);

    dispatch({
      type: BOOKING_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(AdminLogout());
    }
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: message,
    });
  }
};

export const ViewBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DETAILS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${url}/api/v1/booking/view/${id}`, config);

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(AdminLogout());
    }
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const BookingApproved = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_APPROVED_REQUEST,
    });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/approve/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_APPROVED_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(AdminLogout());
    }
    dispatch({
      type: BOOKING_APPROVED_FAIL,
      payload: message,
    });
  }
};

export const BookingCancel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CALCEL_REQUEST,
    });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/cancel/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_CALCEL_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(AdminLogout());
    }
    dispatch({
      type: BOOKING_CALCEL_FAIL,
      payload: message,
    });
  }
};

export const SuperBookingApproved = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_APPROVED_REQUEST,
    });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/approve/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_APPROVED_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_APPROVED_FAIL,
      payload: message,
    });
  }
};

export const SuperBookingCancel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CALCEL_REQUEST,
    });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/cancel/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_CALCEL_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_CALCEL_FAIL,
      payload: message,
    });
  }
};

export const SuperViewBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DETAILS_REQUEST,
    });

    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${url}/api/v1/booking/view/${id}`, config);

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: message,
    });
  }
};

//
export const DoctorBookingApproved = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_APPROVED_REQUEST,
    });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/approve/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_APPROVED_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_APPROVED_FAIL,
      payload: message,
    });
  }
};

export const DoctorBookingCancel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CALCEL_REQUEST,
    });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/booking/cancel/${id}`,
      {},
      config
    );
    dispatch({
      type: BOOKING_CALCEL_SUCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: BOOKING_CALCEL_FAIL,
      payload: message,
    });
  }
};

export const DoctorViewBooking = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_DETAILS_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(`${url}/api/v1/meeting/view/${id}`, config);

    dispatch({
      type: BOOKING_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: message,
    });
  }
};
