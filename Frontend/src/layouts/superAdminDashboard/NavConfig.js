// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/superadmin/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Admin',
    path: '/superadmin/admin/list',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Doctor',
    path: '/superadmin/doctor',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Booking List',
    path: '/superadmin/booking/list',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
