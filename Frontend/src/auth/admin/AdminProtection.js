import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Admin from 'src/pages/Admin';

AdminProtection.prototype = {
  children: PropTypes.element,
};

export default function AdminProtection({ children }) {
  const navigate = useNavigate();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  // useEffect(() => {
  //   if (superAdminInfo) {
  //     jwt.verify(superAdminInfo.token, 'secretkey', function (err, decoded) {
  //       if (err) {
  //         dispatch(Logout());
  //         navigate('/superadmin/login', { replace: true });
  //       }
  //     });
  //   } else {
  //     navigate('/superadmin/login', { replace: true });
  //   }
  // });
  useEffect(() => {
    if (!adminInfo) {
      navigate('/admin/login', { replace: true });
    }
  }, [adminInfo, navigate]);

  return children;
}
