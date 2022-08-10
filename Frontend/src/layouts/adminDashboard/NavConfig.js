// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/admin/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Doctor',
    path: '/admin/doctor',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'BookingList',
    path: '/admin/booking',
    icon: getIcon('eva:people-fill'),
  },
];

export default navConfig;
