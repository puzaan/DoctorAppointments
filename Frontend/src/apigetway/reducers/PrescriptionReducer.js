import {
  PRESCRIPTION_CREATE_FAIL,
  PRESCRIPTION_CREATE_REQUEST,
  PRESCRIPTION_CREATE_RESET,
  PRESCRIPTION_CREATE_SUCCESS,
  PRESCRIPTION_SEND_FAIL,
  PRESCRIPTION_SEND_REQUEST,
  PRESCRIPTION_SEND_SUCCESS,
} from '../constants/PrescriptionConstants';

export const PrescriptionCreateReducer = (state = { meeting: { patientDetail: {}, prescription: {} } }, action) => {
  switch (action.type) {
    case PRESCRIPTION_CREATE_REQUEST:
      return { ...state, loading: true, meeting: {} };
    case PRESCRIPTION_CREATE_SUCCESS:
      return { loading: false, success: true, meeting: action.payload };
    case PRESCRIPTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRESCRIPTION_CREATE_RESET:
      return { meeting: {} };
    default:
      return state;
  }
};

export const SendPrescriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case PRESCRIPTION_SEND_REQUEST:
      return { loading: true, success: false };
    case PRESCRIPTION_SEND_SUCCESS:
      return { loading: false, success: true };
    case PRESCRIPTION_SEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
