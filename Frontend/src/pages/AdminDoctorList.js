import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// material
import {
  Box,
  Card,
  Stack,
  Avatar,
  Container,
  Typography,
  IconButton,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// components
import {
  AdmindeleteDoctorSignup,
  ApprovedListDoctor,
} from "../apigetway/actions/DoctorAction";
import Page from "../components/Page";
import Error from "./Error";
import Loder from "./Loading";

// eslint-disable-next-line
const MatEdit = ({ index }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/admin/signup/doctor/${index}`, { replace: true });
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
    // eslint - disable - next - line;
    if (window.confirm("Are you sure")) {
      dispatch(AdmindeleteDoctorSignup(id));
    }
    console.log(id);
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
    field: "email",
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
    // renderCell: (params) => (
    //   <ul className="flex">
    //     {params.value.map((role, index) => (
    //       <li key={index}>{role}</li>
    //     ))}
    //   </ul>
    // ),
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
    field: "Approped",
    headerName: "Approped",
    type: "boolean",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) =>
      params.row.Approped ? (
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
    field: "NMC_number",
    headerName: "Nmc Number",
    type: "number",
    width: 120,
    editable: false,
    sortable: false,
    menubar: false,
    disableColumnMenu: true,
  },
  {
    field: "MBBS",
    headerName: "MBBS",
    type: "number",
    width: 120,
    editable: false,
    sortable: false,
    menubar: false,
    disableColumnMenu: true,
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
        <MatEdit index={params.row.doctorSinId} />
        <MatDelete index={params.row.doctorSinId} />
      </div>
    ),
  },
];

export default function AdminDoctorList() {
  const dispatch = useDispatch();
  const DoctorApprovedList = useSelector((state) => state.DoctorApprovedList);
  const { loading, error, doctorApproved } = DoctorApprovedList;

  useEffect(() => {
    dispatch(ApprovedListDoctor());
  }, [dispatch]);

  const doctorDelete = useSelector((state) => state.doctorDelete);
  const { error: deletError, loading: deleteLoading } = doctorDelete;

  return (
    <Page title="Approved Doctor List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Approved Doctor List
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="/admin/doctor/create"
            startIcon={<AddIcon />}
          >
            New Doctor
          </Button> */}
        </Stack>
        {deletError && <Error>{deletError}</Error>}
        {deleteLoading && <Loder />}

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
              getRowId={(row) => row.doctorSinId}
              rows={doctorApproved}
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
