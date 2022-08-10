import {
  BOOKING_APPROVED_FAIL,
  BOOKING_APPROVED_REQUEST,
  BOOKING_APPROVED_SUCESS,
  BOOKING_CALCEL_FAIL,
  BOOKING_CALCEL_REQUEST,
  BOOKING_CALCEL_SUCESS,
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_RESET,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_RESET,
  BOOKING_LIST_SUCCESS,
} from '../constants/BookingConstants';

export const BookingListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_REQUEST:
      return { loading: true, bookings: [] };
    case BOOKING_LIST_SUCCESS:
      return {
        loading: false,
        bookings: action.payload,
      };
    case BOOKING_LIST_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_LIST_RESET:
      return { bookings: [] };
    default:
      return state;
  }
};
export const BookingDetailsReducer = (state = { booking: {} }, action) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { ...state, loading: true, booking: {} };
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, success: true, booking: action.payload };
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_DETAILS_RESET:
      return { booking: {} };
    default:
      return state;
  }
};

export const BookingApprovedReducer = (state = { approveBook: {} }, action) => {
  switch (action.type) {
    case BOOKING_APPROVED_REQUEST:
      return { ...state, loading: true, approveBook: {} };
    case BOOKING_APPROVED_SUCESS:
      return { loading: false, success: true, approveBook: action.payload };
    case BOOKING_APPROVED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const BookingCancelReducer = (state = { cancelBook: {} }, action) => {
  switch (action.type) {
    case BOOKING_CALCEL_REQUEST:
      return { ...state, loading: true, cancelBook: {} };
    case BOOKING_CALCEL_SUCESS:
      return { loading: false, success: true, cancelBook: action.payload };
    case BOOKING_CALCEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
