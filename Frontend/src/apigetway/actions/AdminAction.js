import axios from "axios";
import {
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMIN_DELETE_FAIL,
  ADMIN_DELETE_REQUEST,
  ADMIN_DELETE_SUCCESS,
  ADMIN_DETAILS_FAIL,
  ADMIN_DETAILS_REQUEST,
  ADMIN_DETAILS_RESET,
  ADMIN_DETAILS_SUCCESS,
  ADMIN_LIST_FAIL,
  ADMIN_LIST_REQUEST,
  ADMIN_LIST_SUCCESS,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCESS,
  ADMIN_LOGOUT,
  ADMIN_PASSWORD_CHANGE_FAIL,
  ADMIN_PASSWORD_CHANGE_REQUEST,
  ADMIN_PASSWORD_CHANGE_SUCCESS,
  ADMIN_UPDATE_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_RESET,
  ADMIN_UPDATE_SUCCESS,
} from "../constants/AdminConstants";
import { SUPERADMIN_LOGOUT } from "../constants/SuperAdminConstants";
import url from "../mainUrl";

export const SuperAdminLogout = () => (dispatch) => {
  localStorage.removeItem("superAdminInfo");
  dispatch({ type: SUPERADMIN_LOGOUT });
  document.location.href = "/superadmin/login";
};
export const CreateAdmin =
  (fullName, dob, gender, address, contactNumber, emailId, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_CREATE_REQUEST,
      });

      const {
        superAdminLogin: { superAdminInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: `${superAdminInfo.toke}`,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${url}/api/v1/admin/create`,
        { fullName, dob, gender, address, contactNumber, emailId, password },
        config
      );
      dispatch({
        type: ADMIN_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(SuperAdminLogout());
      }
      dispatch({
        type: ADMIN_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const ListAdmins = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_LIST_REQUEST });

    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${superAdminInfo.toke}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${url}/api/v1/admin/view/all`, config);
    dispatch({
      type: ADMIN_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: ADMIN_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DELETE_REQUEST,
    });

    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${superAdminInfo.toke}`,
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`${url}/api/v1/admin/delete/${id}`, config);

    dispatch({
      type: ADMIN_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};

export const UpdateAdmin = (id, field, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_REQUEST,
    });

    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${superAdminInfo.toke}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/admin/update/${id}`,
      {
        field: `${field}`,
        value: `${value}`,
      },
      config
    );

    dispatch({ type: ADMIN_UPDATE_SUCCESS });

    dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data });

    dispatch({ type: ADMIN_DETAILS_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: ADMIN_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const ViewAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DETAILS_REQUEST,
    });

    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${superAdminInfo.toke}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${url}/api/v1/admin/view/${id}`, config);

    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(SuperAdminLogout());
    }
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const AdminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${url}/api/v1/auth/admin/login`, {
      email,
      password,
    });
    dispatch({
      type: ADMIN_LOGIN_SUCESS,
      playload: data.data,
    });
    // to save SUPERADMIN info into local storage
    localStorage.setItem("adminInfo", JSON.stringify(data.data));
  } catch (err) {
    const message =
      err.response && err.response.data.msg
        ? err.response.data.msg
        : err.message;
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload: message,
    });
  }
};

// export const AdminListAdmins = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: ADMIN_LIST_REQUEST });
//     const token = 'BA673A414C3B44C98478BB5CF10A0F832574090C';
//     const {
//       superAdminLogin: { superAdminInfo },
//     } = getState();

//     const config = {
//       headers: {
//         API_KEY: token,
//         'Content-Type': 'application/json',
//       },
//     };
//     const { data } = await axios.get(`${url}/api/v1/admin/view/all`, config);

//     dispatch({
//       type: ADMIN_LIST_SUCCESS,
//       payload: data.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_LIST_FAIL,
//       payload: error.response && error.response.data.message ? error.response.data.message : error.message,
//     });
//   }
// };

// export const AdmindeleteAdmin = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: ADMIN_DELETE_REQUEST,
//     });

//     const token = 'BA673A414C3B44C98478BB5CF10A0F832574090C';
//     const {
//       adminLogin: { adminInfo },
//     } = getState();

//     const config = {
//       headers: {
//         API_KEY: `${token}`,
//         'Content-Type': 'application/json',
//       },
//     };

//     await axios.delete(`${url}/api/v1/admin/delete/${id}`, config);

//     dispatch({
//       type: ADMIN_DELETE_SUCCESS,
//     });
//   } catch (error) {
//     const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//     // if (message === 'Not authorized, token failed') {
//     //   dispatch(logout());
//     // }
//     dispatch({
//       type: ADMIN_DELETE_FAIL,
//       payload: message,
//     });
//   }
// };

export const AdminUpdateAdmin =
  (id, field, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_UPDATE_REQUEST,
      });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: `${adminInfo.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${url}/api/v1/admin/update/${id}`,
        {
          field: `${field}`,
          value: `${value}`,
        },
        config
      );

      dispatch({ type: ADMIN_UPDATE_SUCCESS, payload: data.data });
      localStorage.setItem("adminInfo", JSON.stringify(data.data));

      // dispatch({ type: ADMIN_DETAILS_SUCCESS, payload: data });

      dispatch({ type: ADMIN_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(Logout());
      }
      dispatch({
        type: ADMIN_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const AdminViewAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_DETAILS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${adminInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${url}/api/v1/admin/view/${id}`, config);

    dispatch({
      type: ADMIN_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(Logout());
    }
    dispatch({
      type: ADMIN_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const AdminPasswordChange =
  (id, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADMIN_PASSWORD_CHANGE_REQUEST,
      });
      const {
        adminLogin: { adminInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: adminInfo.token,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${url}/api/v1/admin/change/password/${id}?password=${password}`,
        {},
        config
      );
      dispatch({
        type: ADMIN_PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(Logout());
      }
      dispatch({
        type: ADMIN_PASSWORD_CHANGE_FAIL,
        payload: message,
      });
    }
  };

export const Logout = () => (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
  document.location.href = "/admin/login";
};
