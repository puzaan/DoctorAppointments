import {
  MEETING_CREATE_FAIL,
  MEETING_CREATE_REQUEST,
  MEETING_CREATE_RESET,
  MEETING_CREATE_SUCCESS,
  MEETING_DETAILS_FAIL,
  MEETING_DETAILS_REQUEST,
  MEETING_DETAILS_SUCCESS,
  MEETING_LIST_FAIL,
  MEETING_LIST_REQUEST,
  MEETING_LIST_RESET,
  MEETING_LIST_SUCCESS,
} from '../constants/MeetingConstants';

export const MeetingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEETING_CREATE_REQUEST:
      return { loading: true };
    case MEETING_CREATE_SUCCESS:
      return { loading: false, success: true, meetingInfo: action.payload };
    case MEETING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MEETING_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const MeetingDetailsReducer = (state = { meeting: { patientDetail: {} } }, action) => {
  switch (action.type) {
    case MEETING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case MEETING_DETAILS_SUCCESS:
      return { loading: false, success: true, meeting: action.payload };
    case MEETING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const MeetingListReducer = (state = { meetings: [] }, action) => {
  switch (action.type) {
    case MEETING_LIST_REQUEST:
      return { loading: true, meetings: [] };
    case MEETING_LIST_SUCCESS:
      return {
        loading: false,
        meetings: action.payload,
      };
    case MEETING_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MEETING_LIST_RESET:
      return { meetings: [] };
    default:
      return state;
  }
};
