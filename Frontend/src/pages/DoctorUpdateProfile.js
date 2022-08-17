import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// mui
import {
  ListItem,
  List,
  IconButton,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  ListItemText,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  DoctorView,
  DoctorUpdate,
  DoctorAddNo,
  DoctordeleteNo,
  DoctorAddVideo,
  DoctorAddEducation,
  DoctorAddTag,
  DoctordeleteVideo,
  DoctordeleteEducation,
  DoctordeleteTag,
  DoctorAddTime,
} from '../apigetway/actions/DoctorAction';
import Loder from './Loading';
import Error from './Error';
import Page from '../components/Page';

import { DOCTOR_UPDATE_RESET } from '../apigetway/constants/DoctorConstants';
import { PasswordChange } from '../sections/auth/PasswordChange';
import url from '../apigetway/mainUrl';

const DoctorUpdateProfile = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const doctorView = useSelector((state) => state.doctorView);
  const { error: viewError, success: viewSuccess, loading: viewLoading, doctor } = doctorView;

  const doctorUpdate = useSelector((state) => state.doctorUpdate);
  const { success, error } = doctorUpdate;

  const doctorDeleteNumber = useSelector((state) => state.doctorDeleteNumber);
  const { success: deleteNumberSuccess, error: deleteNumberError } = doctorDeleteNumber;

  const doctorAddNumber = useSelector((state) => state.doctorAddNumber);
  const { success: numberSucess, error: numberError } = doctorAddNumber;

  const doctorAddVideo = useSelector((state) => state.doctorAddVideo);
  const { success: videoSuccess, error: videoError } = doctorAddVideo;

  const doctorDeleteVideo = useSelector((state) => state.doctorDeleteVideo);
  const { success: deleteVideoSuccess, error: deleteVideoErro } = doctorDeleteVideo;

  const doctorAddEducation = useSelector((state) => state.doctorAddEducation);
  const { success: educationSuccess, error: educationError } = doctorAddEducation;

  const doctorDeleteEducation = useSelector((state) => state.doctorDeleteEducation);
  const { success: deleteEduSuccess, error: deleteEducationError } = doctorDeleteEducation;

  const doctorAddTag = useSelector((state) => state.doctorAddTag);
  const { success: tagSuccess, error: tagError } = doctorAddTag;

  const doctorDelectTag = useSelector((state) => state.doctorDelectTag);
  const { success: deleteTagSuccess, error: deleteTagError } = doctorDelectTag;

  const doctorAddTime = useSelector((state) => state.doctorAddTime);
  const { success: addTimeSuccess, error: addTimeError } = doctorAddTime;

  const [fullName, setName] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [NMCnumber, setNMCnumber] = useState('');
  const [emailId, setEmail] = useState('');
  const [fee, setfee] = useState('');
  const [videoList, setVideoList] = useState('');
  const [tag, setTag] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [education, seteducation] = useState('');
  const [profile, setProfile] = useState('');
  const [uploading, setUploading] = useState(false);

  const [dateTime, setDateTime] = useState(new Date());
  const [date, setDate] = useState('');

  const updateName = () => {
    dispatch(DoctorUpdate(id, 'fullName', fullName));
  };

  const updateAddress = () => {
    dispatch(DoctorUpdate(id, 'address', address));
  };
  const updateGender = () => {
    dispatch(DoctorUpdate(id, 'gender', gender));
  };
  const updateNMCNumber = () => {
    dispatch(DoctorUpdate(id, 'NMC_number', NMCnumber));
  };
  const updateEmail = () => {
    dispatch(DoctorUpdate(id, 'emailId', emailId));
  };
  const updateFee = () => {
    dispatch(DoctorUpdate(id, 'fee', fee));
  };
  const addNumber = () => {
    dispatch(DoctorAddNo(id, contactNumber));
  };

  const deleteNumber = (value) => {
    dispatch(DoctordeleteNo(id, value));
  };
  const addVideo = () => {
    dispatch(DoctorAddVideo(id, videoList));
  };

  const addEducation = () => {
    dispatch(DoctorAddEducation(id, education));
  };
  const deleteEducation = (value) => {
    dispatch(DoctordeleteEducation(id, value));
  };
  const deleteVideo = (value) => {
    dispatch(DoctordeleteVideo(id, value));
  };

  const addTag = () => {
    dispatch(DoctorAddTag(id, tag));
  };

  const deleteTag = (value) => {
    dispatch(DoctordeleteTag(id, value));
  };

  const addTime = () => {
    dispatch(DoctorAddTime(id, date));
  };

  const singleFileChange = (e) => {
    setProfile(e.target.files[0]);
  };

  const uploadProfile = () => {
    const formData = new FormData();
    formData.append('img', profile);
    setUploading(false);
    const config = {
      headers: {
        API_KEY: doctor.token,
      },
    };
    axios
      .post(`${url}/api/v1/doctor/add/profile/image/${id}`, formData, config)
      // eslint-disable-next-line
      .then((res) => {
        // console.log(res);
        setUploading(true);
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };

  useEffect(() => {
    dispatch(DoctorView(id));
    setDate(new Date(dateTime).getTime() / 1000.0);
    console.log(doctor);
    if (
      success ||
      deleteNumberSuccess ||
      numberSucess ||
      videoSuccess ||
      educationSuccess ||
      tagSuccess ||
      deleteTagSuccess ||
      deleteEduSuccess ||
      deleteVideoSuccess ||
      addTimeSuccess ||
      uploading
    ) {
      window.location.reload(false);
      dispatch({ type: DOCTOR_UPDATE_RESET });
    }
  }, [
    id,
    success,
    dispatch,
    deleteNumberSuccess,
    numberSucess,
    videoSuccess,
    educationSuccess,
    tagSuccess,
    deleteTagSuccess,
    deleteEduSuccess,
    deleteVideoSuccess,
    dateTime,
    addTimeSuccess,
    uploading,
  ]);
  return (
    <Page title="Update Profile">
      {viewLoading && <Loder />}
      {viewError && <Error>{viewError}</Error>}
      {error && <Error>{error}</Error>}
      {viewSuccess && (
        <>
          <Box
            component={Card}
            variant={"outlined"}
            spacing={2}
            padding={2}
            margin={4}
            bgcolor={"transparent"}
            display={"flex"}
            flexDirection={{ xs: "column", sm: "row" }}
          >
            <Box
              component={Grid}
              display={"flex"}
              container
              alignItems={"center"}
              spacing={2}
            >
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Full Name
                </Typography>
                <TextField
                  label={doctor.fullName}
                  variant="outlined"
                  name={"fullName"}
                  fullWidth
                  value={fullName}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={fullName === ""}
                  onClick={updateName}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Address
                </Typography>
                <TextField
                  label={doctor.address}
                  variant="outlined"
                  name={"address"}
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={address === ""}
                  onClick={updateAddress}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Gender
                </Typography>
                <TextField
                  label={doctor.gender}
                  variant="outlined"
                  name={"gender"}
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={gender === ""}
                  onClick={updateGender}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  NMC Number
                </Typography>
                <TextField
                  label={doctor.NMC_number}
                  variant="outlined"
                  name={"NMC_number"}
                  fullWidth
                  value={NMCnumber}
                  onChange={(e) => setNMCnumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={NMCnumber === ""}
                  onClick={updateNMCNumber}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  email Id
                </Typography>
                <TextField
                  label={doctor.emailId}
                  variant="outlined"
                  name={"emailId"}
                  fullWidth
                  type={"email"}
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={emailId === ""}
                  onClick={updateEmail}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Fee
                </Typography>
                <TextField
                  label={`रू: ${doctor.fee}`}
                  variant="outlined"
                  name={"fee"}
                  fullWidth
                  value={fee}
                  onChange={(e) => setfee(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  disabled={fee === ""}
                  onClick={updateFee}
                  startIcon={<EditIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {addTimeError && <Error>{addTimeError}</Error>}
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Date & Time
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Date&Time"
                    disablePast
                    value={dateTime}
                    onChange={(newValue) => {
                      setDateTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  onClick={addTime}
                  startIcon={<EditIcon />}
                >
                  Add
                </Button>
              </Grid>

              <Grid item xs={12} sm={12} md={8}>
                {videoError && <Error> {videoError} </Error>}
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Video Links
                </Typography>
                <TextField
                  label="Video Link"
                  variant="outlined"
                  fullWidth
                  value={videoList}
                  onChange={(e) => setVideoList(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  onClick={addVideo}
                  disabled={videoList === ""}
                  startIcon={<EditIcon />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {tagError && <Error> {tagError} </Error>}
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Tag
                </Typography>
                <TextField
                  label="Tags"
                  variant="outlined"
                  fullWidth
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  onClick={addTag}
                  disabled={tag === ""}
                  startIcon={<EditIcon />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {numberError && <Error> {numberError} </Error>}

                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Contact Number
                </Typography>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  name={"fullName"}
                  fullWidth
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  onClick={addNumber}
                  disabled={contactNumber === ""}
                  startIcon={<EditIcon />}
                >
                  Add
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                {educationError && <Error> {educationError} </Error>}
                <Typography variant={"subtitle2"} sx={{ marginBottom: 2 }}>
                  Education Background
                </Typography>
                <TextField
                  label="Education Background"
                  variant="outlined"
                  fullWidth
                  value={education}
                  onChange={(e) => seteducation(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4} marginTop={{ md: 5 }}>
                <Button
                  variant="outlined"
                  onClick={addEducation}
                  disabled={education === ""}
                  startIcon={<EditIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Box>
            <Box
              component={Grid}
              container
              display={"flex"}
              alignItems={"center"}
              marginTop={2}
              flexDirection={"row"}
            >
              <Box
                component={Grid}
                container
                display={"flex"}
                alignItems={"center"}
                marginTop={2}
                flexDirection={"column"}
              >
                <Avatar
                  alt={doctor.fullName}
                  src={doctor.profilePhotoLink}
                  sx={{ width: 200, height: 200, marginBottom: 5 }}
                  variant="square"
                />
                <div className="from-group">
                  {/* <lable>Select Single File</lable> */}
                  <input
                    accept="image/*"
                    type="file"
                    className="form-control"
                    onChange={(e) => singleFileChange(e)}
                  />
                </div>
                <div className="row">
                  <div className="col-10">
                    <Button variant="contained" onClick={() => uploadProfile()}>
                      Upload
                    </Button>
                  </div>
                </div>
              </Box>
              <Box
                component={Grid}
                container
                display={"flex"}
                marginTop={2}
                flexDirection={"row"}
              >
                <Grid item sm={12} xs={12} md={8}>
                  {deleteNumberError && <Error>{deleteNumberError} </Error>}
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Contact Number
                  </Typography>
                  {viewSuccess && (
                    <>
                      <List>
                        {doctor.contactNumber.map((item, index) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteNumber(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Grid>
              </Box>
              <Box
                component={Grid}
                container
                display={"flex"}
                marginTop={2}
                flexDirection={"row"}
              >
                <Grid item sm={12} xs={12} md={8}>
                  {deleteEducationError && (
                    <Error>{deleteEducationError}</Error>
                  )}

                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Education Background
                  </Typography>

                  {viewSuccess && (
                    <>
                      <List>
                        {doctor.educationBackground.map((item, index) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteEducation(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Grid>
              </Box>

              <Box
                component={Grid}
                container
                display={"flex"}
                marginTop={2}
                flexDirection={"row"}
              >
                <Grid item sm={12} xs={12} md={8}>
                  {deleteVideoErro && <Error>{deleteVideoErro}</Error>}
                  <Typography sx={{ mt: 4, mb: 2 }} variant="h6">
                    Video Link
                  </Typography>
                  {viewSuccess && (
                    <>
                      <List>
                        {doctor.videoList.map((item, index) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteVideo(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Grid>
              </Box>
              <Box
                component={Grid}
                container
                display={"flex"}
                marginTop={2}
                flexDirection={"row"}
              >
                <Grid item sm={12} xs={12} md={8}>
                  {deleteTagError && <Error> {deleteTagError} </Error>}
                  <Typography
                    sx={{ mt: 4, mb: 2 }}
                    variant="h6"
                    component="div"
                  >
                    Tags
                  </Typography>
                  {viewSuccess && (
                    <>
                      <List>
                        {doctor.tag.map((item, index) => (
                          <ListItem
                            key={index}
                            secondaryAction={
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteTag(item)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                          >
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </Grid>
              </Box>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <PasswordChange docId={id} />
          </Box>
        </>
      )}
    </Page>
  );
};

export default DoctorUpdateProfile;
