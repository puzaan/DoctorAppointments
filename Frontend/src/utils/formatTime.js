import {formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

// export function fDateTimeSuffix(date) {
//   return format(new Date(date), 'dd/MM/yyyy hh:mm p');
// }

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
