import axios from "axios";
import {
  MEETING_CREATE_FAIL,
  MEETING_CREATE_REQUEST,
  MEETING_CREATE_SUCCESS,
  MEETING_DETAILS_FAIL,
  MEETING_DETAILS_REQUEST,
  MEETING_DETAILS_SUCCESS,
  MEETING_LIST_FAIL,
  MEETING_LIST_REQUEST,
  MEETING_LIST_SUCCESS,
} from "../constants/MeetingConstants";
import url from "../mainUrl";
import { DoctorLogout } from "./DoctorAction";

export const CreateMeeting =
  (
    patientName,
    phoneNumber,
    gender,
    address,
    age,
    description,
    dateRequested,
    timeRequested,
    doctorId,
    patientEmail,
    occupation
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: MEETING_CREATE_REQUEST,
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

      const { data } = await axios.post(
        `${url}/api/v1/meeting/create`,
        {
          patientName,
          phoneNumber,
          gender,
          address,
          age,
          message: description,
          dateRequested,
          timeRequested,
          doctorId,
          patientEmail,
          occupation,
        },
        config
      );
      dispatch({
        type: MEETING_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.msg
          ? error.response.msg
          : error.message;
      if (message === "No valid api Key Used") {
        dispatch(DoctorLogout());
      }
      dispatch({
        type: MEETING_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const MeetingView = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEETING_DETAILS_REQUEST,
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

    const { data } = await axios.get(
      `${url}/api/v1/meeting/view/meeting/${id}`,
      config
    );
    dispatch({
      type: MEETING_DETAILS_SUCCESS,
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
      type: MEETING_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const MeetingList = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: MEETING_LIST_REQUEST });
    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: doctorInfo.token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `${url}/api/v1/meeting/view/${id}`,
      config
    );

    dispatch({
      type: MEETING_LIST_SUCCESS,
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
      type: MEETING_LIST_FAIL,
      payload: message,
    });
  }
};
