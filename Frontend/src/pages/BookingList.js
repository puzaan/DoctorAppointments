import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import { Box, Card, Stack, Container, Typography, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// components
import Page from '../components/Page';
import { ListBookings } from '../apigetway/actions/BookingAction';
// eslint-disable-next-line
// const MatEdit = ({ index }) => {
//   const navigate = useNavigate();
//   const handleEditClick = () => {
//     navigate(`/superadmin/booking/view/${index}`, { replace: true });
//   };

//   return (
//     <FormControlLabel
//       control={
//         <IconButton color="secondary" aria-label="add an alarm" onClick={handleEditClick}>
//           <Iconify icon="eva:edit-fill" width={24} height={24} />
//         </IconButton>
//       }
//     />
//   );
// };

// const MatDelete = ({ index }) => {
//   const dispatch = useDispatch();
//   const adminDelete = useSelector((state) => state.adminDelete);
//   const { error: deletError, loading: deleteLoading, success: sucessDelete } = adminDelete;

//   const adminList = useSelector((state) => state.adminList);

//   const { loading, error, admins } = adminList;

//   useEffect(() => {
//     if (sucessDelete) {
//       window.location.reload(false);
//     }
//   }, [sucessDelete, admins]);

//   const handleDeleteClick = (id) => {
//     if (window.confirm('Are you sure')) {
//       dispatch(deleteAdmin(id));
//     }
//     console.log(`Delete doctor Id : ${id}`);
//   };

//   return (
//     <FormControlLabel
//       control={
//         <IconButton color="secondary" aria-label="add an alarm" onClick={() => handleDeleteClick(index)}>
//           <Iconify icon="eva:trash-2-outline" width={24} height={24} />
//         </IconButton>
//       }
//     />
//   );
// };

const columns = [
  {
    field: 'fullName',
    headerName: 'Full Name',
    width: 140,
    editable: false,
    alignItems: 'center',
  },

  {
    field: 'email',
    headerName: 'Email',
    width: 190,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'bookingdate',
    headerName: 'Date',
    width: 105,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => new Date(params.row.bookingdate).toLocaleDateString(),
  },
  {
    field: 'timeslot',
    headerName: 'Time',
    width: 90,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },

  {
    field: 'doctorId',
    headerName: 'Doctori Id',
    width: 130,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'approved',
    headerName: 'Approved',
    type: 'boolean',
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) =>
      params.row.approved ? (
        <Stack direction="row" spacing={1}>
          <Chip label="Approved" size="small" color="success" />
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Chip label="Not Approved" size="small" color="error" />
        </Stack>
      ),
  },

  {
    field: 'contact',
    headerName: 'Contact No',
    type: 'number',
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'address',
    headerName: 'Address',
    type: 'number',
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'sex',
    headerName: 'Sex',
    type: 'number',
    width: 90,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: 'age',
    headerName: 'DOB',
    type: 'number',
    width: 100,
    editable: false,
    sortable: false,
    menubar: false,
    disableColumnMenu: true,
    renderCell: (params) => new Date(params.row.age).toLocaleDateString(),
  },
  // {
  //   field: 'actions',
  //   headerName: 'Actions',
  //   editable: false,
  //   sortable: false,
  //   menubar: false,
  //   disableColumnMenu: true,
  //   width: 90,
  //   disableClickEventBubbling: false,
  //   renderCell: (params) => (
  //     <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }} padding={1}>
  //       <MatEdit index={params.row.requestId} />
  //       {/* <MatDelete index={params.row.adminId} /> */}
  //     </div>
  //   ),
  // },
];

export default function BookingList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ListBookings());
  }, [dispatch]);

  const bookingList = useSelector((state) => state.bookingList);
  const { loading, error, bookings } = bookingList;

  return (
    <Page title="Booking">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Booking List
          </Typography>
        </Stack>

        <Card>
          <Box
            sx={{
              height: 400,
              width: '100%',
              '& .css-40a90u-MuiDataGrid-columnHeaders ': {
                backgroundColor: 'rgb(211,227,251)',
              },
            }}
          >
            <DataGrid
              loading={loading}
              error={error}
              getRowId={(row) => row.requestId}
              rows={bookings}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
