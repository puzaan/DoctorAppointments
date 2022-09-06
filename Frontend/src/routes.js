import { Navigate, useRoutes } from "react-router-dom";
// layouts
// import DashboardLayout from './layouts/dashboard';
import AdminDashboardLayout from "./layouts/adminDashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
import SuperAdminDashboardLayout from "./layouts/superAdminDashboard";
import DoctorDashboardLayout from "./layouts/doctorDashboard";
//
import NotFound from "./pages/Page404";
import DashboardApp from "./pages/DashboardApp";
import AdminDashboard from "./pages/AdminDasnboard";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import DoctorList from "./pages/DoctorLis";
import AdminCreate from "./pages/AdminCreate";
import { SuperAdminProtection } from "./auth/superAdmin";
import { AdminProtection } from "./auth/admin";
import { DoctorProtection } from "./auth/doctor";
import DoctorCreate from "./pages/DoctorCreate";
import AdminDoctorCreate from "./pages/AdminDoctorCreate";
import AdminList from "./pages/AdminList";
import BookingList from "./pages/BookingList";
import AdminUpdate from "./pages/AdminUpdate";
import DoctorUpdate from "./pages/DoctorUpdate";
import AdminLogin from "./pages/AdminLogin";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import DoctorForgotPassword from "./pages/DoctorForgotPassword";
import AdminDoctorList from "./pages/AdminDoctorList";
import AdminBookingList from "./pages/AdminBookingList";
import AdminDoctorUpdate from "./pages/AdminDoctorUpdate";
import DoctorLogin from "./pages/DoctorLogin";
import BookingView from "./pages/BookingView";
import SuperAdminBookingView from "./pages/SuperAdminBookingView";
import DoctorBookingList from "./pages/DoctorBookingList";
import { HomePage } from "./pages/HomePage";
import DoctorUpdateProfile from "./pages/DoctorUpdateProfile";
import MeetingCreate from "./pages/MeetingCreate";
import MeetingDetail from "./pages/MeetingDetail";
import AdminUpdateProfile from "./pages/AdminUpdateProfile";
import DoctorSignup from "./pages/DoctorSignup";
import AdminDoctorSignupList from "./pages/AdminDoctorSignupList";
import SignupDoctorView from "./pages/SignupDoctorView";
import Specialists from "./pages/Specialists";
import DoctorFirstTimePasswordChange from "./pages/DoctorFirstTimePasswordChange";
import DocTalk from "./pages/DocTalk";
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // superAdmin  route
    {
      path: "/superadmin",
      element: (
        // <SuperAdminProtection>

        // </SuperAdminProtection>
        <SuperAdminDashboardLayout />
      ),
      children: [
        {
          path: "app",
          element: (
            <SuperAdminProtection>
              <DashboardApp />
            </SuperAdminProtection>
          ),
        },
        {
          path: "doctor",
          element: (
            <SuperAdminProtection>
              <DoctorList />
            </SuperAdminProtection>
          ),
        },
        {
          path: "doctor/create",
          element: (
            <SuperAdminProtection>
              <DoctorCreate />
            </SuperAdminProtection>
          ),
        },
        {
          path: "admin/list",
          element: (
            <SuperAdminProtection>
              <AdminList />
            </SuperAdminProtection>
          ),
        },
        {
          path: "admin/create",
          element: (
            <SuperAdminProtection>
              <AdminCreate />
            </SuperAdminProtection>
          ),
        },
        {
          path: "admin/update/:id",
          element: (
            <SuperAdminProtection>
              <AdminUpdate />
            </SuperAdminProtection>
          ),
        },
        {
          path: "doctor/update/:id",
          element: (
            <SuperAdminProtection>
              <DoctorUpdate />
            </SuperAdminProtection>
          ),
        },
        {
          path: "booking/list",
          element: (
            <SuperAdminProtection>
              <BookingList />
            </SuperAdminProtection>
          ),
        },
        {
          path: "booking/view/:id",
          element: (
            <SuperAdminProtection>
              <SuperAdminBookingView />
            </SuperAdminProtection>
          ),
        },
      ],
    },
    // Super admin logout route
    {
      path: "/superadmin",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/superadmin", element: <Navigate to="/superadmin/app" /> },
        { path: "login", element: <SuperAdminLogin /> },
        {
          path: "404",
          element: <NotFound route={"/superadmin/app"} title={"Super Admin"} />,
        },
        { path: "*", element: <Navigate to="/superadmin/404" /> },
      ],
    },
    // admin route
    {
      path: "/admin",
      element: (
        <AdminProtection>
          <AdminDashboardLayout />
        </AdminProtection>
      ),
      children: [
        {
          path: "app",
          element: (
            <AdminProtection>
              <AdminDashboard />
            </AdminProtection>
          ),
        },
        {
          path: "profile/:id",
          element: (
            <AdminProtection>
              <AdminUpdateProfile />
            </AdminProtection>
          ),
        },
        {
          path: "doctor",
          element: (
            <AdminProtection>
              <AdminDoctorList />
            </AdminProtection>
          ),
        },
        {
          path: "doctor/create",
          element: (
            <AdminProtection>
              <AdminDoctorCreate />
            </AdminProtection>
          ),
        },
        {
          path: "signup/doctor/list",
          element: (
            <AdminProtection>
              <AdminDoctorSignupList />
            </AdminProtection>
          ),
        },
        {
          path: "signup/doctor/:id",
          element: (
            <AdminProtection>
              <SignupDoctorView />
            </AdminProtection>
          ),
        },
        {
          path: "booking",
          element: (
            <AdminProtection>
              <AdminBookingList />
            </AdminProtection>
          ),
        },
        {
          path: "booking/view/:id",
          element: (
            <AdminProtection>
              <BookingView />
            </AdminProtection>
          ),
        },
        {
          path: "meeting/create/:id",
          element: (
            <AdminProtection>
              <MeetingCreate />
            </AdminProtection>
          ),
        },
        {
          path: "doctor/update/:id",
          element: (
            <AdminProtection>
              <AdminDoctorUpdate />
            </AdminProtection>
          ),
        },
      ],
    },
    // admin logout route
    {
      path: "/admin",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/admin", element: <Navigate to="/admin/app" /> },
        { path: "login", element: <AdminLogin /> },
        { path: "forgot", element: <AdminForgotPassword /> },
        {
          path: "404",
          element: <NotFound route={"/admin/app"} title={"Admin"} />,
        },
        { path: "*", element: <Navigate to="/admin/404" /> },
      ],
    },
    // doctor route
    {
      path: "/doctor",
      element: <DoctorDashboardLayout />,
      children: [
        {
          path: "booking",
          element: (
            <DoctorProtection>
              <DoctorBookingList />
            </DoctorProtection>
          ),
        },
        {
          path: "profile/:id",
          element: (
            <DoctorProtection>
              <DoctorUpdateProfile />
            </DoctorProtection>
          ),
        },
        {
          path: "meeting/:id",
          element: (
            <DoctorProtection>
              <MeetingDetail />
            </DoctorProtection>
          ),
        },
      ],
    },
    // doctor logout route
    {
      path: "/doctor",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/doctor", element: <Navigate to="/doctor/booking" /> },
        { path: "login", element: <DoctorLogin /> },
        { path: "forgot", element: <DoctorForgotPassword /> },
        { path: "change/password", element: <DoctorFirstTimePasswordChange /> },
        {
          path: "404",
          element: <NotFound route={"/doctor/booking"} title={"Doctor"} />,
        },
        { path: "*", element: <Navigate to="/doctor/404" /> },
      ],
    },
    // simple logout route
    { path: "/", element: <Navigate to="/form" /> },
    { path: "/doctor/signup", element: <DoctorSignup /> },

    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        // { path: 'login', element: <Login /> },
        { path: "superAdminlogin", element: <SuperAdminLogin /> },
        // { path: 'form', element: <HomePage /> },

        // { path: 'register', element: <Register /> },
        { path: "404", element: <NotFound route={"/"} /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "/form", element: <HomePage /> },
    { path: "/speccialist", element: <Specialists /> },

    { path: "/aboutus", element: <DocTalk /> },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
