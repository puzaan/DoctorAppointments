import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// material

import {
  Box,
  Card,
  Stack,
  Container,
  Typography,
  IconButton,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";

// components
import Page from "../components/Page";
import { MeetingList } from "../apigetway/actions/MeetingAction";

const MatEdit = ({ index }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`/doctor/meeting/${index}`, { replace: false });
  };

  MatEdit.propTypes = {
    index: PropTypes.string,
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
const columns = [
  {
    field: "patientName",
    headerName: "Full Name",
    width: 160,
    editable: false,
    alignItems: "center",
  },
  {
    field: "active",
    headerName: "Meeting",
    type: "boolean",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) =>
      params.row.approved ? (
        <Stack direction="row" spacing={1}>
          <Chip label="Not Attended" size="small" color="error" />
        </Stack>
      ) : (
        <Stack direction="row" spacing={1}>
          <Chip label="Attended" size="small" color="success" />
        </Stack>
      ),
  },

  {
    field: "address",
    headerName: "Address",
    width: 140,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    color: "#1a3e72",
  },
  {
    field: "phoneNumber",
    headerName: "Contact No",
    width: 105,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "age",
    headerName: "Date of birth",
    width: 130,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },

  {
    field: "gender",
    headerName: "Gender",
    width: 80,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "dataRequest",
    headerName: "Date",
    width: 110,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
    disableClickEventBubbling: false,
    renderCell: (params) =>
      new Date(params.row.dataRequest).toLocaleDateString("en-US"),
  },
  {
    field: "timeRequest",
    headerName: "Time",
    width: 85,
    editable: false,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "actions",
    headerName: "View",
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
        <MatEdit index={params.row.meetingId} />
      </div>
    ),
  },
];

export default function DoctorBookingList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctorLogin = useSelector((state) => state.doctorLogin);
  const { doctorInfo } = doctorLogin;
  useEffect(() => {
    if (!doctorInfo) {
      navigate("/doctor/login", { replace: true });
    } else {
      dispatch(MeetingList(doctorInfo.doctorSinId));
    }
  }, [dispatch, navigate, doctorInfo]);

  const meetingList = useSelector((state) => state.meetingList);
  const { loading, error, meetings } = meetingList;

  return (
    <Page title="Meeting List">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Meeting List
          </Typography>
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
              getRowId={(row) => row.meetingId}
              rows={meetings}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
              search
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
