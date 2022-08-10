import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { isEmpty, isNull } from 'lodash';


SuperAdminProtection.prototype = {
  children: PropTypes.element,
};

export default function SuperAdminProtection({ children }) {
  const navigate = useNavigate();
  const superAdminLogin = useSelector((state) => state.superAdminLogin);
  const { superAdminInfo } = superAdminLogin;

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
    if (!superAdminInfo) {
      navigate('/superadmin/login', { replace: false });
    }
  },);
  return children;
}
