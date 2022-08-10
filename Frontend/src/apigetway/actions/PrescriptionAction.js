import axios from 'axios';
import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_SEND_FAIL,
  PRESCRIPTION_SEND_REQUEST,
  PRESCRIPTION_SEND_SUCCESS,
} from '../constants/PrescriptionConstants';
import url from '../mainUrl';
import { DoctorLogout } from './DoctorAction';

export const CreatePrescription = (id, complaints, observation, advise, treatment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_CREATE_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${doctorInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `${url}/api/v1/meeting/update/prescription/${id}`,
      {
        complaints,
        observation,
        advise,
        treatment,
      },
      config
    );
    dispatch({
      type: PRESCRIPTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: PRESCRIPTION_CREATE_FAIL,
      payload: message,
    });
  }
};

export const SendPrescription = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRESCRIPTION_SEND_REQUEST,
    });

    const {
      doctorLogin: { doctorInfo },
    } = getState();

    const config = {
      headers: {
        API_KEY: `${doctorInfo.token}`,
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`${url}/api/v1/meeting/send/pdf/${id}`, config);
    dispatch({
      type: PRESCRIPTION_SEND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = error.response && error.response.data.msg ? error.response.data.msg : error.message;
    if (message === 'No valid api Key Used') {
      dispatch(DoctorLogout());
    }
    dispatch({
      type: PRESCRIPTION_SEND_FAIL,
      payload: message,
    });
  }
};
