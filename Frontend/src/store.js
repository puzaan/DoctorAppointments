import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { superAdminLoginReducer } from './apigetway/reducers/SuperAdminReducer';
import {
  AdminCreateReducer,
  AdminDeleteReducer,
  AdminDetailsReducer,
  AdminListReducer,
  AdminLoginReducer,
  AdminPasswordChangeReducer,
  AdminUpdateReducer,
} from './apigetway/reducers/AdminReduicer';
import {
  DoctorListReducer,
  DoctorDeleteReducer,
  DoctorUpdateReducer,
  DoctorDetailsReducer,
  DoctorCreateReducer,
  DoctorLoginReducer,
  DoctorAddContactReducer,
  DoctorDeleteContactReducer,
  DoctorAddVideoReducer,
  DoctorDeleteVideoReducer,
  DoctorAddEducationReducer,
  DoctorDeleteEducationtReducer,
  DoctorAddTagReducer,
  DoctorDeleteTagReducer,
  DoctorAddTimeReducer,
  DoctorAddProfileReducer,
  DoctorForgotPasswordReducer,
  DoctorPasswordChangeReducer,
} from './apigetway/reducers/DoctorReduicer';
import {
  BookingApprovedReducer,
  BookingCancelReducer,
  BookingDetailsReducer,
  BookingListReducer,
} from './apigetway/reducers/BookingReducer';
import { MeetingCreateReducer, MeetingDetailsReducer, MeetingListReducer } from './apigetway/reducers/MeetingReducer';
import { PrescriptionCreateReducer, SendPrescriptionReducer } from './apigetway/reducers/PrescriptionReducer';

const reducer = combineReducers({
  superAdminLogin: superAdminLoginReducer,

  adminLogin: AdminLoginReducer,
  adminCreate: AdminCreateReducer,
  adminList: AdminListReducer,
  adminDelete: AdminDeleteReducer,
  adminUpdate: AdminUpdateReducer,
  adminView: AdminDetailsReducer,
  adminPasswordChange: AdminPasswordChangeReducer,

  doctorList: DoctorListReducer,
  doctorDelete: DoctorDeleteReducer,
  doctorUpdate: DoctorUpdateReducer,
  doctorCreate: DoctorCreateReducer,
  doctorView: DoctorDetailsReducer,
  doctorLogin: DoctorLoginReducer,
  doctorAddNumber: DoctorAddContactReducer,
  doctorDeleteNumber: DoctorDeleteContactReducer,
  doctorAddVideo: DoctorAddVideoReducer,
  doctorDeleteVideo: DoctorDeleteVideoReducer,
  doctorAddEducation: DoctorAddEducationReducer,
  doctorDeleteEducation: DoctorDeleteEducationtReducer,
  doctorAddTag: DoctorAddTagReducer,
  doctorDelectTag: DoctorDeleteTagReducer,
  doctorAddTime: DoctorAddTimeReducer,
  doctorAddProfile: DoctorAddProfileReducer,
  doctorForgotPassword: DoctorForgotPasswordReducer,
  doctorPasswordChange: DoctorPasswordChangeReducer,

  bookingList: BookingListReducer,
  bookingCancel: BookingCancelReducer,
  bookingApproved: BookingApprovedReducer,
  bookingView: BookingDetailsReducer,

  prescriptionCreate: PrescriptionCreateReducer,
  prescriptionSend: SendPrescriptionReducer,

  meetingCreate: MeetingCreateReducer,
  meetingDetail: MeetingDetailsReducer,
  meetingList: MeetingListReducer,
});

const superAdminInfoFromStore = localStorage.getItem('superAdminInfo')
  ? JSON.parse(localStorage.getItem('superAdminInfo'))
  : null;

const adminInfoFromStore = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null;
const doctorInfoFromStore = localStorage.getItem('doctorInfo') ? JSON.parse(localStorage.getItem('doctorInfo')) : null;

const initialState = {
  superAdminLogin: {
    superAdminInfo: superAdminInfoFromStore,
  },
  adminLogin: {
    adminInfo: adminInfoFromStore,
  },
  doctorLogin: {
    doctorInfo: doctorInfoFromStore,
  },
};
const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
