/*eslint-disable */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Admin from 'src/pages/Admin';

DoctorProtection.prototype = {
  children: PropTypes.element,
};

export default function DoctorProtection({ children }) {
  const navigate = useNavigate();
  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;

  // useEffect(() => {
  //   if (doctorInfo) {
  //     jwt.verify(doctorInfo.token, 'secretkey', function (err, decoded) {
  //       if (err) {
  //         dispatch(Logout());
  //         navigate('/doctor/login', { replace: true });
  //       }
  //     });
  //   } else {
  //     navigate('/doctor/login', { replace: true });
  //   }
  // });
  useEffect(() => {
    if (!doctorInfo) {
      navigate('/doctor/login', { replace: true });
    }
  }, [doctorInfo, navigate]);

  return children;
}
