import { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// material
import {
  Box,
  Card,
  Stack,
  Avatar,
  Button,
  Container,
  Typography,
  IconButton,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// components
import { deleteDoctor, ListDoctors } from "../apigetway/actions/DoctorAction";
import Page from "../components/Page";
import Error from "./Error";
// eslint-disable-next-line
const MatEdit = ({ index }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/superadmin/doctor/update/${index}`, { replace: true });
  };

  return (
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
      }
    />
  );
};

// eslint-disable-next-line
const MatDelete = ({ index }) => {
  const dispatch = useDispatch();
  const doctorDelete = useSelector((state) => state.doctorDelete);
  const { success: sucessDelete } = doctorDelete;

  useEffect(() => {
    if (sucessDelete) {
      window.location.reload(false);
    }
  }, [sucessDelete]);

  const handleDeleteClick = (id) => {
    // eslint-disable-next-line
    if (window.confirm("Are you sure")) {
      dispatch(deleteDoctor(id));
    }
  };

  return (
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={() => handleDeleteClick(index)}
        >
          <DeleteIcon />
        </IconButton>
      }
    />
  );
};

const columns = [
  {
    field: "fullName",
    headerName: "Full Name",
    width: 160,
    editable: false,
    alignItems: "center",
    renderCell: (params) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar
          alt={params.row.fullName}
          //   src={'/static/mock-images/avatars/avatar_1.jpg'}
          src={params.row.profilePhotoLink}
        />
        <Typography variant="subtitle2" noWrap>
          {params.row.fullName}
        </Typography>
      </Stack>
    ),
  },
  {
    field: "emailId",
    headerName: "Email",
    width: 190,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "contactNumber",
    headerName: "Contact No",
    type: "number",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <ul className="flex">
        {params.value.map((role, index) => (
          <li key={index}>{role}</li>
        ))}
      </ul>
    ),
  },
  //   {
  //     field: 'available_dates',
  //     headerName: 'Time',
  //     type: 'number',
  //     width: 110,
  //     editable: false,
  //     sortable: false,
  //     disableColumnMenu: true,
  //     renderCell: (params) => (
  //       <ul className="flex">
  //         {params.value.map((role, index) => (
  //           <li key={index}>
  //             {new Date(role.date * 1000).toLocaleTimeString([], {
  //               hour: '2-digit',
  //               minute: '2-digit',
  //             })}
  //           </li>
  //         ))}
  //       </ul>
  //     ),
  //   },
  {
    field: "address",
    headerName: "Address",
    type: "number",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    type: "number",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "dob",
    headerName: "DOB",
    type: "number",
    width: 120,
    editable: false,
    sortable: false,
    menubar: false,
    disableColumnMenu: true,
    renderCell: (params) =>
      new Date(params.row.dob).toLocaleDateString("en-US"),
  },
  {
    field: "actions",
    headerName: "Actions",
    editable: false,
    sortable: false,
    menubar: false,
    disableColumnMenu: true,
    width: 90,
    disableClickEventBubbling: false,
    renderCell: (params) => (
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ cursor: "pointer", padding: 1 }}
      >
        <MatEdit index={params.row.doctorId} />
        <MatDelete index={params.row.doctorId} />
      </div>
    ),
  },
];

export default function DoctorList() {
  const dispatch = useDispatch();
  const doctorList = useSelector((state) => state.doctorList);
  const { loading, error, doctors } = doctorList;
  const doctorDelete = useSelector((state) => state.doctorDelete);
  const { error: deletError } = doctorDelete;
  useEffect(() => {
    dispatch(ListDoctors());
  }, [dispatch]);

  return (
    <Page title="Doctor List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Doctor List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/superadmin/doctor/create"
            startIcon={<AddIcon />}
          >
            New Doctor
          </Button>
        </Stack>
        {error && <Error>{deletError.msg}</Error>}

        <Card>
          <Box
            sx={{
              height: 400,
              width: "100%",
              "& .css-40a90u-MuiDataGrid-columnHeaders ": {
                backgroundColor: "rgb(211,227,251)",
              },
            }}
          >
            <DataGrid
              loading={loading}
              error={error}
              getRowId={(row) => row.doctorId}
              rows={doctors}
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
