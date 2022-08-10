// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Meeting List',
    path: '/doctor/booking',
    icon: getIcon('el:comment-alt'),
  },
];

export default navConfig;
