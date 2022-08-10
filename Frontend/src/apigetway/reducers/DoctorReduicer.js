import {
  DOCTOR_ADD_EDUCATION_FAIL,
  DOCTOR_ADD_EDUCATION_REQUEST,
  DOCTOR_ADD_EDUCATION_RESET,
  DOCTOR_ADD_EDUCATION_SUCCESS,
  DOCTOR_ADD_NUMBER_FAIL,
  DOCTOR_ADD_NUMBER_REQUEST,
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
  DOCTOR_CREATE_RESET,
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
  DOCTOR_LIST_RESET,
  DOCTOR_LIST_SUCCESS,
  DOCTOR_LOGIN_FAIL,
  DOCTOR_LOGIN_REQUEST,
  DOCTOR_LOGIN_SUCESS,
  DOCTOR_LOGOUT,
  DOCTOR_PASSWORD_CHANGE_FAIL,
  DOCTOR_PASSWORD_CHANGE_REQUEST,
  DOCTOR_PASSWORD_CHANGE_RESET,
  DOCTOR_PASSWORD_CHANGE_SUCCESS,
  DOCTOR_UPDATE_FAIL,
  DOCTOR_UPDATE_REQUEST,
  DOCTOR_UPDATE_RESET,
  DOCTOR_UPDATE_SUCCESS,
} from '../constants/DoctorConstants';

export const DoctorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_CREATE_REQUEST:
      return { loading: true };
    case DOCTOR_CREATE_SUCCESS:
      return { loading: false, success: true, doctorInfo: action.payload };
    case DOCTOR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const DoctorListReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_REQUEST:
      return { loading: true, doctors: [] };
    case DOCTOR_LIST_SUCCESS:
      return {
        loading: false,
        doctors: action.payload,
      };
    case DOCTOR_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_LIST_RESET:
      return { doctors: [] };
    default:
      return state;
  }
};

export const DoctorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_UPDATE_REQUEST:
      return { loading: true };
    case DOCTOR_UPDATE_SUCCESS:
      return { loading: false, success: true, doctorInfo: action.payload };
    case DOCTOR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const DoctorDetailsReducer = (
  state = {
    doctor: {
      affiliated_hospital: [],
      available_dates: [],
      contactNumber: [],
      educationBackground: [],
      tag: [],
      videoList: [],
    },
  },
  action
) => {
  switch (action.type) {
    case DOCTOR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case DOCTOR_DETAILS_SUCCESS:
      
      return { loading: false, success: true, doctor: action.payload };
    case DOCTOR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_LOGIN_REQUEST:
      return { loading: true };
    case DOCTOR_LOGIN_SUCESS:
      return { loading: false, doctorInfo: action.playload };
    case DOCTOR_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const DoctorAddContactReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_ADD_NUMBER_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_NUMBER_SUCCESS:
      return { loading: false, success: true, doctorContactInfo: action.payload };
    case DOCTOR_ADD_NUMBER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const DoctorDeleteContactReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_NUMBER_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_NUMBER_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_DELETE_NUMBER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorAddTimeReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_ADD_TIME_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_TIME_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_ADD_TIME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorAddVideoReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_ADD_VIDEO_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_VIDEO_SUCCESS:
      return { loading: false, success: true, doctorEducationInfo: action.payload };
    case DOCTOR_ADD_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_ADD_VIDEO_RESET:
      return {};
    default:
      return state;
  }
};
export const DoctorDeleteVideoReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_VIDEO_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_VIDEO_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_DELETE_VIDEO_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorAddEducationReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_ADD_EDUCATION_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_EDUCATION_SUCCESS:
      return { loading: false, success: true, doctorEducationInfo: action.payload };
    case DOCTOR_ADD_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_ADD_EDUCATION_RESET:
      return {};
    default:
      return state;
  }
};
export const DoctorDeleteEducationtReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_EDUCATION_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_EDUCATION_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_DELETE_EDUCATION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorAddTagReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_ADD_TAG_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_TAG_SUCCESS:
      return { loading: false, success: true, doctorTagInfo: action.payload };
    case DOCTOR_ADD_TAG_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_ADD_TAG_RESET:
      return {};
    default:
      return state;
  }
};
export const DoctorDeleteTagReducer = (state = { doctor: {} }, action) => {
  switch (action.type) {
    case DOCTOR_DELETE_TAG_REQUEST:
      return { loading: true };
    case DOCTOR_DELETE_TAG_SUCCESS:
      return { loading: false, success: true };
    case DOCTOR_DELETE_TAG_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const DoctorAddProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_ADD_PROFILE_REQUEST:
      return { loading: true };
    case DOCTOR_ADD_PROFILE_SUCCESS:
      return { loading: false, success: true, doctorProfileInfo: action.payload };
    case DOCTOR_ADD_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// export const DoctorForgotPasswordReducer = (state = {}, action) => {
//   switch (action.type) {
//     case DOCTOR_FORGOT_PASSWORD_REQUEST:
//       return { loading: true };
//     case DOCTOR_FORGOT_PASSWORD_SUCCESS:
//       return { loading: false, success: true };
//     case DOCTOR_FORGOT_PASSWORD_FAIL:
//       return { loading: false, errorss: action.payload };
//     case DOCTOR_FORGOT_PASSWORD_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

export const DoctorForgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_FORGOT_PASSWORD_REQUEST:
      return { loading: true };
    case DOCTOR_FORGOT_PASSWORD_SUCCESS:
      return { loading: false, success: true, doctorPasswordInfo: action.payload };
    case DOCTOR_FORGOT_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_FORGOT_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const DoctorPasswordChangeReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCTOR_PASSWORD_CHANGE_REQUEST:
      return { loading: true };
    case DOCTOR_PASSWORD_CHANGE_SUCCESS:
      return { loading: false, success: true, doctorPasswordInfo: action.payload };
    case DOCTOR_PASSWORD_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    case DOCTOR_PASSWORD_CHANGE_RESET:
      return {};
    default:
      return state;
  }
};
