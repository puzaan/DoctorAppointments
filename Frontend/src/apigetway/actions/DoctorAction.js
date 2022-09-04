/*eslint-disable */
import axios from "axios";
import { ADMIN_LOGOUT } from "../constants/AdminConstants";
import {
  DOCTOR_ADD_EDUCATION_FAIL,
  DOCTOR_ADD_EDUCATION_REQUEST,
  DOCTOR_ADD_EDUCATION_RESET,
  DOCTOR_ADD_EDUCATION_SUCCESS,
  DOCTOR_ADD_NUMBER_FAIL,
  DOCTOR_ADD_NUMBER_REQUEST,
  DOCTOR_ADD_NUMBER_RESET,
  DOCTOR_ADD_NUMBER_SUCCESS,
  DOCTOR_ADD_PROFILE_FAIL,
  DOCTOR_ADD_PROFILE_REQUEST,
  DOCTOR_ADD_PROFILE_SUCCESS,
  DOCTOR_ADD_TAG_FAIL,
  DOCTOR_ADD_TAG_REQUEST,
  DOCTOR_ADD_TAG_RESET,
  DOCTOR_ADD_TAG_SUCCESS,
  DOCTOR_ADD_TIME_FAIL,
  DOCTOR_ADD_TIME_REQUEST,
  DOCTOR_ADD_TIME_SUCCESS,
  DOCTOR_ADD_VIDEO_FAIL,
  DOCTOR_ADD_VIDEO_REQUEST,
  DOCTOR_ADD_VIDEO_RESET,
  DOCTOR_ADD_VIDEO_SUCCESS,
  DOCTOR_CREATE_FAIL,
  DOCTOR_CREATE_REQUEST,
  DOCTOR_CREATE_SUCCESS,
  DOCTOR_DELETE_EDUCATION_FAIL,
  DOCTOR_DELETE_EDUCATION_REQUEST,
  DOCTOR_DELETE_EDUCATION_SUCCESS,
  DOCTOR_DELETE_FAIL,
  DOCTOR_DELETE_NUMBER_FAIL,
  DOCTOR_DELETE_NUMBER_REQUEST,
  DOCTOR_DELETE_NUMBER_SUCCESS,
  DOCTOR_DELETE_REQUEST,
  DOCTOR_DELETE_SUCCESS,
  DOCTOR_DELETE_TAG_FAIL,
  DOCTOR_DELETE_TAG_REQUEST,
  DOCTOR_DELETE_TAG_SUCCESS,
  DOCTOR_DELETE_VIDEO_FAIL,
  DOCTOR_DELETE_VIDEO_REQUEST,
  DOCTOR_DELETE_VIDEO_SUCCESS,
  DOCTOR_DETAILS_FAIL,
  DOCTOR_DETAILS_REQUEST,
  DOCTOR_DETAILS_SUCCESS,
  DOCTOR_FORGOT_PASSWORD_FAIL,
  DOCTOR_FORGOT_PASSWORD_REQUEST,
  DOCTOR_FORGOT_PASSWORD_RESET,
  DOCTOR_FORGOT_PASSWORD_SUCCESS,
  DOCTOR_LIST_FAIL,
  DOCTOR_LIST_REQUEST,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCESS,
  DOCTOR_LOGOUT,
  DOCTOR_PASSWORD_CHANGE_FAIL,
  DOCTOR_PASSWORD_CHANGE_REQUEST,
  DOCTOR_PASSWORD_CHANGE_SUCCESS,
  DOCTOR_SIGNUP_APPROVED_FAIL,
  DOCTOR_SIGNUP_APPROVED_LIST_FAIL,
  DOCTOR_SIGNUP_APPROVED_LIST_REQUEST,
  DOCTOR_SIGNUP_APPROVED_LIST_SUCCESS,
  DOCTOR_SIGNUP_APPROVED_REQUEST,
  DOCTOR_SIGNUP_APPROVED_SUCCESS,
  DOCTOR_SIGNUP_FAIL,
  DOCTOR_SIGNUP_LIST_FAIL,
  DOCTOR_SIGNUP_LIST_REQUEST,
  DOCTOR_SIGNUP_LIST_SUCCESS,
  DOCTOR_SIGNUP_NOT_APPROVED_LIST_FAIL,
  DOCTOR_SIGNUP_NOT_APPROVED_LIST_REQUEST,
  DOCTOR_SIGNUP_NOT_APPROVED_LIST_SUCCESS,
  DOCTOR_SIGNUP_REQUEST,
  DOCTOR_SIGNUP_SUCCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_RESET,
  DOCTOR_UPDATE_SUCCESS,
} from "../constants/DoctorConstants";
import { SUPERADMIN_LOGOUT } from "../constants/SuperAdminConstants";
import url from "../mainUrl";

export const AdminLogout = () => (dispatch) => {
  localStorage.removeItem("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
  document.location.href = "/admin/login";
};
export const SuperAdminLogout = () => (dispatch) => {
  localStorage.removeItem("superAdminInfo");
  dispatch({ type: SUPERADMIN_LOGOUT });
  document.location.href = "/superadmin/login";
};

export const CreateDoctor =
  (
    fullName,
    emailId,
    password,
    contactNumber,
    gender,
    address,
    dob,
    speciality,
    NMC_number,
    fee
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_CREATE_REQUEST,
      });

      const {
        superAdminLogin: { superAdminInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: superAdminInfo.toke,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${url}/api/v1/doctor/create`,
        {
          fullName,
          emailId,
          password,
          contactNumber,
          gender,
          address,
          dob,
          speciality,
          NMC_number,
          fee,
        },
        config
      );
      dispatch({
        type: DOCTOR_CREATE_SUCCESS,
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
        type: DOCTOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const ListDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: superAdminInfo.toke,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${url}/api/v1/doctor/view/all`, config);

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
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
      type: DOCTOR_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_REQUEST,
    });

    const token = "BA673A414C3B44C98478BB5CF10A0F832574090C";
    const {
      superAdminLogin: { superAdminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${superAdminInfo.toke}`,
        "Content-Type": "application/json",
      },
    };

    await axios.delete(`${url}/api/v1/doctor/delete/${id}`, config);

    dispatch({
      type: DOCTOR_DELETE_SUCCESS,
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
      type: DOCTOR_DELETE_FAIL,
      payload: message,
    });
  }
};

export const UpdateDoctor =
  (id, field, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_UPDATE_REQUEST,
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
        `${url}/api/v1/doctor/update/${id}`,
        {
          field: `${field}`,
          value: `${value}`,
        },
        config
      );

      dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: data });
      dispatch({ type: DOCTOR_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(SuperAdminLogout());
      }
      dispatch({
        type: DOCTOR_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const ViewDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DETAILS_REQUEST,
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

    const { data } = await axios.get(`${url}/api/v1/doctor/view/${id}`, config);

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
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
      type: DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const AdminCreateDoctor =
  (
    fullName,
    emailId,
    password,
    contactNumber,
    gender,
    address,
    dob,
    speciality,
    NMC_number,
    fee
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_CREATE_REQUEST,
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

      const { data } = await axios.post(
        `${url}/api/v1/doctor/create`,
        {
          fullName,
          emailId,
          password,
          contactNumber,
          gender,
          address,
          dob,
          speciality,
          NMC_number,
          fee,
        },
        config
      );
      dispatch({
        type: DOCTOR_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(AdminLogout());
      }
      dispatch({
        type: DOCTOR_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const AdminListDoctors = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`${url}/api/v1/doctor/view/all`, config);

    dispatch({
      type: DOCTOR_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(AdminLogout());
    }
    dispatch({
      type: DOCTOR_LIST_FAIL,
      payload: message,
    });
  }
};

export const AdmindeleteDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_REQUEST,
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

    await axios.delete(`${url}/api/v1/doctor/delete/${id}`, config);

    dispatch({
      type: DOCTOR_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(AdminLogout());
    }
    dispatch({
      type: DOCTOR_DELETE_FAIL,
      payload: message,
    });
  }
};

export const AdminUpdateDoctor =
  (id, field, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_UPDATE_REQUEST,
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
        `${url}/api/v1/doctor/update/${id}`,
        {
          field: `${field}`,
          value: `${value}`,
        },
        config
      );

      dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: data });
      dispatch({ type: DOCTOR_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(AdminLogout());
      }
      dispatch({
        type: DOCTOR_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctorAddNo = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_NUMBER_REQUEST,
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
      `${url}/api/v1/doctor/add/number/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_NUMBER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_NUMBER_FAIL,
      payload: message,
    });
  }
};

export const AdminDoctordeleteNo =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_DELETE_NUMBER_REQUEST,
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
      const { newData } = await axios.delete(
        `${url}/api/v1/doctor/delete/number/${id}/${value}`,
        config,
        {}
      );

      dispatch({
        type: DOCTOR_DELETE_NUMBER_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_DELETE_NUMBER_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctorAddVideo =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_ADD_VIDEO_REQUEST,
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
        `${url}/api/v1/doctor/add/video/${id}`,
        {
          value: `${value}`,
        },
        config
      );

      dispatch({ type: DOCTOR_ADD_VIDEO_SUCCESS, payload: data });
      dispatch({ type: DOCTOR_ADD_VIDEO_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_ADD_VIDEO_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctordeleteVideo =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_DELETE_VIDEO_REQUEST,
      });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const data = {
        value: `${value}`,
      };

      const { newData } = await axios.delete(
        `${url}/api/v1/doctor/delete/video/${id}`,
        {
          headers: {
            API_KEY: adminInfo.token,
            "Content-Type": "application/json",
          },
          data,
        }
      );

      dispatch({
        type: DOCTOR_DELETE_VIDEO_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_DELETE_VIDEO_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctorAddEducation =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_ADD_EDUCATION_REQUEST,
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
        `${url}/api/v1/doctor/add/education/${id}`,
        {
          value: `${value}`,
        },
        config
      );

      dispatch({ type: DOCTOR_ADD_EDUCATION_SUCCESS, payload: data });

      dispatch({ type: DOCTOR_ADD_EDUCATION_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_ADD_EDUCATION_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctordeleteEducation =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_DELETE_EDUCATION_REQUEST,
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

      const data = {
        value: `${value}`,
      };

      const { newData } = await axios.delete(
        `${url}/api/v1/doctor/delete/education/${id}`,
        {
          headers: {
            API_KEY: doctorInfo.token,
            "Content-Type": "application/json",
          },
          data,
        }
      );

      dispatch({
        type: DOCTOR_DELETE_EDUCATION_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_DELETE_EDUCATION_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctorAddTag = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_TAG_REQUEST,
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
      `${url}/api/v1/doctor/add/tag/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_TAG_SUCCESS, payload: data });

    dispatch({ type: DOCTOR_ADD_TAG_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_TAG_FAIL,
      payload: message,
    });
  }
};

export const AdminDoctordeleteTag =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_DELETE_TAG_REQUEST,
      });

      const {
        adminLogin: { adminInfo },
      } = getState();

      const data = {
        value: `${value}`,
      };
      const { newData } = await axios.delete(
        `${url}/api/v1/doctor/delete/tag/${id}`,
        {
          headers: {
            API_KEY: adminInfo.token,
            "Content-Type": "application/json",
          },
          data,
        }
      );

      dispatch({
        type: DOCTOR_DELETE_TAG_SUCCESS,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_DELETE_TAG_FAIL,
        payload: message,
      });
    }
  };

export const AdminDoctorAddTime = (id, date) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_TIME_REQUEST,
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
      `${url}/api/v1/doctor/add/dates/${id}?date=${date}&time=8`,
      {},
      config
    );

    dispatch({
      type: DOCTOR_ADD_TIME_SUCCESS,
      playload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_TIME_FAIL,
      payload: message,
    });
  }
};

export const AdminDoctorPasswordChange =
  (id, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_REQUEST,
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
        `${url}/api/v1/doctor/update/password/${id}?password=${password}`,
        {},
        config
      );
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_FAIL,
        payload: message,
      });
    }
  };

// admin doctor update
export const AdminViewDoctor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DETAILS_REQUEST,
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
    const { data } = await axios.get(`${url}/api/v1/doctor/view/${id}`, config);

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(AdminLogout());
    }
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const DoctorLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${url}/api/v1/auth/doctor/login`, {
      email,
      password,
    });
    dispatch({
      type: DOCTOR_LOGIN_SUCESS,
      playload: data.data,
    });
    // to save doctorInfo info into local storage
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: DOCTOR_LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const DoctorLogout = () => (dispatch) => {
  localStorage.removeItem("doctorInfo");
  dispatch({ type: DOCTOR_LOGOUT });
  document.location.href = "/doctor/login";
};
export const DoctorUpdate =
  (id, field, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_UPDATE_REQUEST,
      });
      const {
        doctorLogin: { doctorInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: doctorInfo.token,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${url}/api/v1/doctor/update/${id}`,
        {
          field: `${field}`,
          value: `${value}`,
        },
        config
      );

      dispatch({ type: DOCTOR_UPDATE_SUCCESS, payload: data });
      localStorage.setItem("doctorInfo", JSON.stringify(data.data));
      dispatch({ type: DOCTOR_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const DoctorView = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DETAILS_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.get(`${url}/api/v1/doctor/view/${id}`, config);
    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const DoctorAddNo = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_NUMBER_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/doctor/add/number/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_NUMBER_SUCCESS, payload: data });
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_NUMBER_FAIL,
      payload: message,
    });
  }
};

export const DoctordeleteNo = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_NUMBER_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { newData } = await axios.delete(
      `${url}/api/v1/doctor/delete/number/${id}/${value}`,
      config,
      {}
    );

    dispatch({
      type: DOCTOR_DELETE_NUMBER_SUCCESS,
      // playload: newData.data,
    });
    // localStorage.setItem('doctorInfo', JSON.stringify(newData.data));
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_DELETE_NUMBER_FAIL,
      payload: message,
    });
  }
};

export const DoctorAddVideo = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_VIDEO_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/doctor/add/video/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_VIDEO_SUCCESS, payload: data });
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));

    dispatch({ type: DOCTOR_ADD_VIDEO_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_VIDEO_FAIL,
      payload: message,
    });
  }
};

export const DoctordeleteVideo = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_VIDEO_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };

    const data = {
      value: `${value}`,
    };

    const { newData } = await axios.delete(
      `${url}/api/v1/doctor/delete/video/${id}`,
      {
        headers: {
          API_KEY: doctorInfo.token,
          "Content-Type": "application/json",
        },
        data,
      }
    );

    dispatch({
      type: DOCTOR_DELETE_VIDEO_SUCCESS,
      // playload: newData.data,
    });
    // localStorage.setItem('doctorInfo', JSON.stringify(newData.data));
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_DELETE_VIDEO_FAIL,
      payload: message,
    });
  }
};

export const DoctorAddEducation = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_EDUCATION_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/doctor/add/education/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_EDUCATION_SUCCESS, payload: data });
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));

    dispatch({ type: DOCTOR_ADD_EDUCATION_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_EDUCATION_FAIL,
      payload: message,
    });
  }
};

export const DoctordeleteEducation =
  (id, value) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_DELETE_EDUCATION_REQUEST,
      });

      const {
        doctorLogin: { doctorInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: doctorInfo.token,
          "Content-Type": "application/json",
        },
      };

      const data = {
        value: `${value}`,
      };

      const { newData } = await axios.delete(
        `${url}/api/v1/doctor/delete/education/${id}`,
        {
          headers: {
            API_KEY: doctorInfo.token,
            "Content-Type": "application/json",
          },
          data,
        }
      );

      dispatch({
        type: DOCTOR_DELETE_EDUCATION_SUCCESS,
        // playload: newData.data,
      });
      // localStorage.setItem('doctorInfo', JSON.stringify(newData.data));
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_DELETE_EDUCATION_FAIL,
        payload: message,
      });
    }
  };

export const DoctorAddTag = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_TAG_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/doctor/add/tag/${id}`,
      {
        value: `${value}`,
      },
      config
    );

    dispatch({ type: DOCTOR_ADD_TAG_SUCCESS, payload: data });
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));

    dispatch({ type: DOCTOR_ADD_TAG_RESET });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_TAG_FAIL,
      payload: message,
    });
  }
};

export const DoctordeleteTag = (id, value) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_TAG_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const data = {
      value: `${value}`,
    };
    const { newData } = await axios.delete(
      `${url}/api/v1/doctor/delete/tag/${id}`,
      {
        headers: {
          API_KEY: doctorInfo.token,
          "Content-Type": "application/json",
        },
        data,
      }
    );

    dispatch({
      type: DOCTOR_DELETE_TAG_SUCCESS,
      // playload: newData.data,
    });
    // localStorage.setItem('doctorInfo', JSON.stringify(newData.data));
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_DELETE_TAG_FAIL,
      payload: message,
    });
  }
};

export const DoctorAddTime = (id, date) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_ADD_TIME_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `${url}/api/v1/doctor/add/dates/${id}?date=${date}&time=8`,
      {},
      config
    );

    dispatch({
      type: DOCTOR_ADD_TIME_SUCCESS,
      playload: data.data,
    });
    localStorage.setItem("doctorInfo", JSON.stringify(data.data));
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: DOCTOR_ADD_TIME_FAIL,
      payload: message,
    });
  }
};

export const DoctorForgotPasswordChange =
  (email, newpassword) => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_FORGOT_PASSWORD_REQUEST,
      });

      const { data } = await axios.post(
        `${url}/api/v1/auth/doctor/forgot/password?email=${email}&newpassword=${newpassword}`,
        {}
      );
      dispatch({
        type: DOCTOR_FORGOT_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: DOCTOR_FORGOT_PASSWORD_FAIL,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const DoctorPasswordChange =
  (id, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_REQUEST,
      });
      const {
        doctorLogin: { doctorInfo },
      } = getState();

      const config = {
        headers: {
          API_KEY: doctorInfo.token,
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${url}/api/v1/doctor/update/password/${id}?password=${password}`,
        {},
        config
      );
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: DOCTOR_PASSWORD_CHANGE_FAIL,
        payload: message,
      });
    }
  };

// export const DoctorAddProfile = async (id, data) => {
//   try {
//     dispatch({
//       type: DOCTOR_ADD_PROFILE_REQUEST,
//     });

//     const {
//       doctorLogin: { doctorInfo },
//     } = getState();

//     const config = {
//       headers: {
//         API_KEY: doctorInfo.token,
//         // 'Content-Type': 'application/json',
//       },
//     };

//     await axios.post(`${url}/api/v1/doctor/add/profile/image/${id}`, data, config);

//     dispatch({
//       type: DOCTOR_ADD_PROFILE_SUCCESS,
//     });
//   } catch (error) {
//     const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
//     if (message === 'No valid api Key Used') {
//       dispatch(DoctorLogout());
//     }
//     dispatch({
//       type: DOCTOR_ADD_PROFILE_FAIL,
//       payload: message,
//     });
//   }
// };

export const SignupDoctor = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DOCTOR_SIGNUP_REQUEST,
    });

    const config = {
      headers: {
        // API_KEY: superAdminInfo.toke,
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${url}/api/v1/public/doctor/signup`,
      formData
    );
    dispatch({
      type: DOCTOR_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message,
    });
  }
};

export const AdminListDoctorSignup = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_SIGNUP_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${url}/api/v1/public/doctor/view/signupdoc/all`,
      config
    );

    dispatch({
      type: DOCTOR_SIGNUP_LIST_SUCCESS,
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
      type: DOCTOR_SIGNUP_LIST_FAIL,
      payload: message,
    });
  }
};

export const AdmindeleteDoctorSignup = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DELETE_REQUEST,
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

    await axios.delete(`${url}/api/v1/doctor/delete/signupdoc/${id}`, config);

    dispatch({
      type: DOCTOR_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(AdminLogout());
    }
    dispatch({
      type: DOCTOR_DELETE_FAIL,
      payload: message,
    });
  }
};

export const AdminViewDoctorSignup = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_DETAILS_REQUEST,
    });

    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    };
    const { data } = await axios.get(
      `${url}/api/v1/doctor/view/signupdoc/${id}`,
      config
    );

    dispatch({
      type: DOCTOR_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.msg
        ? error.response.data.msg
        : error.message;
    if (message === "No valid api Key Used") {
      dispatch(AdminLogout());
    }
    dispatch({
      type: DOCTOR_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const ApprovedListDoctor = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_SIGNUP_APPROVED_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${url}/api/v1/doctor/view/approved/doctor`,
      config
    );

    dispatch({
      type: DOCTOR_SIGNUP_APPROVED_LIST_SUCCESS,
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
      type: DOCTOR_SIGNUP_APPROVED_LIST_FAIL,
      payload: message,
    });
  }
};

export const NotApprovedListDoctor = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCTOR_SIGNUP_NOT_APPROVED_LIST_REQUEST });
    const {
      adminLogin: { adminInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: adminInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${url}/api/v1/doctor/view/not/approved/doctor`,
      config
    );

    dispatch({
      type: DOCTOR_SIGNUP_NOT_APPROVED_LIST_SUCCESS,
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
      type: DOCTOR_SIGNUP_NOT_APPROVED_LIST_FAIL,
      payload: message,
    });
  }
};

export const AdminApprovedDoctor =
  (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DOCTOR_SIGNUP_APPROVED_REQUEST,
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
        `${url}/api/v1/doctor/approve/doctor/${id}`,
        {},
        config
      );
      dispatch({
        type: DOCTOR_SIGNUP_APPROVED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(AdminLogout());
      }
      dispatch({
        type: DOCTOR_SIGNUP_APPROVED_FAIL,
        payload: message,
      });
    }
  };



// export const AdminApprovedDoctorSignup = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: DOCTOR_SIGNUP_APPROVED_REQUEST,
//     });

//     const {
//       adminLogin: { adminInfo },
//     } = getState();

//     const config = {
//       header: {
//         api_key:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IkFETUlOIiwiZW1haWxJZCI6InB1amFuLnN0aGEyMkBnbWFpbC5jb20iLCJpYXQiOjE2NjEwNjU5Njl9.9iZyqOWrOqPONtaS1nDbS1TupjyJHLZCybWcuH4r7zg",
//         "Content-Type": "application/json",
//       },
//     };

//     console.log(config);

//     const { data } = await axios.put(
//       `${url}/api/v1/doctor/approve/doctor/${id}`,
//       {},
//       config
//     );

//     dispatch({
//       type: DOCTOR_SIGNUP_APPROVED_SUCCESS,
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.msg
//         ? error.response.data.msg
//         : error.message;
//     // if (message === "No valid api Key Used") {
//     //   dispatch(AdminLogout());
//     // }
//     dispatch({
//       type: DOCTOR_SIGNUP_APPROVED_FAIL,
//       payload: message,
//     });
//   }
// };
