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
import { deleteAdmin, ListAdmins } from "../apigetway/actions/AdminAction";
import Page from "../components/Page";

// eslint-disable-next-line
const MatEdit = ({ index }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/superadmin/admin/update/${index}`, { replace: true });
  };

  return (
    <FormControlLabel
      control={
        <IconButton
          color="secondary"
          aria-label="add an alarm"
          onClick={handleEditClick}
        >
          {/* <EditIcon style={{ color: blue[500] }} /> */}
          <EditIcon />
        </IconButton>
      }
    />
  );
};

// eslint-disable-next-line
const MatDelete = ({ index }) => {
  const dispatch = useDispatch();
  const adminDelete = useSelector((state) => state.adminDelete);
  const { success: sucessDelete } = adminDelete;

  const adminList = useSelector((state) => state.adminList);

  const { admins } = adminList;

  useEffect(() => {
    if (sucessDelete) {
      window.location.reload(false);
    }
  }, [sucessDelete, admins]);

  const handleDeleteClick = (id) => {
    // eslint-disable-next-line
    if (window.confirm("Are you sure")) {
      dispatch(deleteAdmin(id));
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
        <Avatar alt={params.row.fullName} src={params.row.profilePhotoLink} />
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
  },
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
    width: 100,
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
        <MatEdit index={params.row.adminId} />
        <MatDelete index={params.row.adminId} />
      </div>
    ),
  },
];

export default function AdminList() {
  const dispatch = useDispatch();
  const adminList = useSelector((state) => state.adminList);
  const { loading, error, admins } = adminList;
  useEffect(() => {
    dispatch(ListAdmins());
  }, [dispatch]);
  // const {
  //   superAdminLogin: { superAdminInfo },
  // } = getState();

  return (
    <Page title="Admin">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Admin List
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="/superadmin/admin/create"
            startIcon={<AddIcon />}
          >
            New Admin
          </Button>
        </Stack>

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
              getRowId={(row) => row.adminId}
              rows={admins}
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
