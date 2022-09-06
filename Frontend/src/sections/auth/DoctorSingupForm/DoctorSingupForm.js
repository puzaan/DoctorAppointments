import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
// material
import {
  Stack,
  TextField,
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SignupDoctor } from "../../../apigetway/actions/DoctorAction";

// component
import Error from "../../../pages/Error";
// import Loder from "../../../pages/Loading";
// ----------------------------------------------------------------------

export default function DoctorSingupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("paper");
  const handleClose = () => {
    setOpen(false);
    if (success) {
      navigate("/", { replace: true });
    }
  };

  const descriptionElementRef = useRef(null);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your name"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Address is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    gender: Yup.string().required("Please select your gender"),
    contactNumber: Yup.string()
      .min(10, "Contact number is not valid")
      .max(10, "Contact number is not valid")
      .required("Enter your contact Number"),
    NMC_number: Yup.string()
      .min(2, "NMC number is not valid")
      .max(9, "NMC number is not valid")
      .required("Enter your NMC Number"),
    // NmcFile: Yup.mixed().required("NMC Certificate required"),
    specialization: Yup.string().required("Enter your specialization"),
    spKey: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enter your specialization Key"),
    MdMs: Yup.boolean(),
    DmMch: Yup.boolean(),
    MdMsCollege: Yup.string().when("MdMs", {
      is: true,
      then: Yup.string().required("MD MS College Name is required"),
    }),
    // MdMsFile: Yup.mixed().when("MdMs", {
    //   is: true,
    //   then: Yup.mixed().required("Certificate required"),
    // }),
    DmMchCollege: Yup.string().when("DmMch", {
      is: true,
      then: Yup.string().required("DM MCH College Name is required"),
    }),
    // DmMchFile: Yup.mixed().when("DmMch", {
    //   is: true,
    //   then: Yup.mixed().required("DM or MCH Cetificate required"),
    // }),

    MBBS: Yup.string().required("Enter your MBBS Name"),
    // MBBSFile: Yup.mixed().required("MBBS Certificate required"),
    institution1: Yup.string().when("fellow1", {
      is: true,
      then: Yup.string().required("Institution name required"),
    }),
    // fellowshipFile1: Yup.mixed().when("fellow1", {
    //   is: true,
    //   then: Yup.mixed().required("Institution file required"),
    // }),
    institution2: Yup.string().when("fellow2", {
      is: true,
      then: Yup.string().required("Institution name required"),
    }),
    // fellowshipFile2: Yup.mixed().when("fellow2", {
    //   is: true,
    //   then: Yup.mixed().required("Institution file required"),
    // }),
    institution3: Yup.string().when("fellow3", {
      is: true,
      then: Yup.string().required("Institution name required"),
    }),
    // fellowshipFile3: Yup.mixed().when("fellow3", {
    //   is: true,
    //   then: Yup.mixed().required("Institution file required"),
    // }),
    institution4: Yup.string().when("fellow4", {
      is: true,
      then: Yup.string().required("Institution name required"),
    }),
    // fellowshipFile4: Yup.mixed().when("fellow4", {
    //   is: true,
    //   then: Yup.mixed().required("Institution file required"),
    // }),
    institution5: Yup.string().when("fellow5", {
      is: true,
      then: Yup.string().required("Institution name required"),
    }),
    // fellowshipFile5: Yup.mixed().when("fellow5", {
    //   is: true,
    //   then: Yup.mixed().required("Institution file required"),
    // }),
    aff1: Yup.mixed().required("required"),
    // Photo: Yup.mixed().required("Photo is required"),
  });
  const [MD_MS, setMdMs] = useState("None");
  const [DM_MCH, setDmMch] = useState("None");
  const [specializationKey, setSpecializationKey] = useState();
  const doctorSignup = useSelector((state) => state.doctorSignup);
  const { error, success, loading } = doctorSignup;

  const handleChanges = (event) => {
    setMdMs(event.target.value);
    if (event.target.value === "MD" || event.target.value === "MS") {
      formik.setFieldValue("MdMs", true);
    }
  };
  const handleChangeDmMch = (event) => {
    setDmMch(event.target.value);
    if (event.target.value === "DM" || event.target.value === "MCH") {
      formik.setFieldValue("DmMch", true);
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      contactNumber: "",
      gender: "",
      address: "",
      specialization: "",
      NMC_number: "",
      MdMsCollege: "",
      DmMchCollege: "",
      NmcFile: null,
      MBBS: "",
      MBBSFile: null,
      DmMchFile: null,
      MdMsFile: null,
      spKey: "",
      aff1: "",
      aff2: "",
      aff3: "",
      MdMs: false,
      DmMch: false,
      fellow1: false,
      fellow2: false,
      fellow3: false,
      fellow4: false,
      fellow5: false,
      fellowship1: "",
      fellowship2: "",
      fellowship3: "",
      fellowship4: "",
      fellowship5: "",
      institution1: "",
      institution2: "",
      institution3: "",
      institution4: "",
      institution5: "",
      fellowshipFile1: null,
      fellowshipFile2: null,
      fellowshipFile3: null,
      fellowshipFile4: null,
      fellowshipFile5: null,
      Photo: null,
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      const formData = new FormData();
      formData.append("fullName", formik.values.fullName);
      formData.append("email", formik.values.email);
      formData.append("contactNumber", formik.values.contactNumber);
      formData.append("gender", formik.values.gender);
      formData.append("address", formik.values.address);
      formData.append("NMC_number", formik.values.NMC_number);
      formData.append("nmc", formik.values.NmcFile);
      formData.append("MBBS", formik.values.MBBS);
      formData.append("mbbs", formik.values.MBBSFile);
      formData.append("MD_MS", MD_MS);
      formData.append("MdMsCollege", formik.values.DmMchCollege);
      formData.append("md_ms", formik.values.MdMsFile);
      formData.append("DM_MCH", DM_MCH);
      formData.append("DmMchCollege", formik.values.DmMchCollege);
      formData.append("dm_ms", formik.values.DmMchFile);
      formData.append("photo", formik.values.Photo);
      formData.append("specialization", formik.values.specialization);
      formData.append("specializationKey", specializationKey);
      formData.append("Affilation", formik.values.aff1);
      if (formik.values.aff2 !== "") {
        formData.append("Affilation", formik.values.aff2);
      }
      if (formik.values.aff3 !== "") {
        formData.append("Affilation", formik.values.aff3);
      }
      if (formik.values.fellowship1 !== "") {
        formData.append("fellowshipName", formik.values.fellowship1);
      }
      if (formik.values.fellowship2 !== "") {
        formData.append("fellowshipName", formik.values.fellowship2);
      }
      if (formik.values.fellowship3 !== "") {
        formData.append("fellowshipName", formik.values.fellowship3);
      }
      if (formik.values.fellowship4 !== "") {
        formData.append("fellowshipName", formik.values.fellowship4);
      }
      if (formik.values.fellowship5 !== "") {
        formData.append("fellowshipName", formik.values.fellowship5);
      }

      if (formik.values.institution1 !== "") {
        formData.append("institution", formik.values.institution1);
      }
      if (formik.values.institution2 !== "") {
        formData.append("institution", formik.values.institution2);
      }
      if (formik.values.institution3 !== "") {
        formData.append("institution", formik.values.institution3);
      }
      if (formik.values.institution4 !== "") {
        formData.append("institution", formik.values.institution4);
      }
      if (formik.values.institution5 !== "") {
        formData.append("institution", formik.values.institution5);
      }

      if (formik.values.fellowshipFile1) {
        formData.append("fellowship", formik.values.fellowshipFile1);
      }
      if (formik.values.fellowshipFile2) {
        formData.append("fellowship", formik.values.fellowshipFile2);
      }
      if (formik.values.fellowshipFile3) {
        formData.append("fellowship", formik.values.fellowshipFile3);
      }
      if (formik.values.fellowshipFile4) {
        formData.append("fellowship", formik.values.fellowshipFile4);
      }
      if (formik.values.fellowshipFile5) {
        formData.append("fellowship", formik.values.fellowshipFile5);
      }
      formData.append("photo", formik.values.Photo);
      dispatch(SignupDoctor(formData));
    },
  });

  useEffect(() => {
    if (formik.values.spKey) {
      setSpecializationKey(formik.values.spKey.split(","));
    }
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }

    if (success) {
      setOpen(true);
      setScroll("paper");
    }
  }, [formik.values.spKey, open, success]);

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <>
      <Box
        component={Card}
        variant={"outlined"}
        padding={2}
        bgcolor={"transparent"}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Box
                component={Card}
                variant={"outlined"}
                padding={2}
                bgcolor={"transparent"}
              >
                <Typography
                  variant={"h3"}
                  sx={{ marginBottom: 2 }}
                  align={"center"}
                >
                  General Information
                </Typography>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      {...getFieldProps("fullName")}
                      error={Boolean(touched.fullName && errors.fullName)}
                      helperText={touched.fullName && errors.fullName}
                    />

                    <TextField
                      select
                      label="Select gender"
                      variant="outlined"
                      name={"gender"}
                      fullWidth
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      error={Boolean(touched.gender && errors.gender)}
                      helperText={touched.gender && errors.gender}
                    >
                      {["Male", "Female", "Other"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="Address"
                      {...getFieldProps("address")}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="Mobie Number"
                      {...getFieldProps("contactNumber")}
                      error={Boolean(
                        touched.contactNumber && errors.contactNumber
                      )}
                      helperText={touched.contactNumber && errors.contactNumber}
                    />
                  </Stack>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email address"
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Box>

              <Box
                component={Card}
                variant={"outlined"}
                padding={2}
                bgcolor={"transparent"}
              >
                <Typography
                  variant={"h3"}
                  sx={{ marginBottom: 2 }}
                  align={"center"}
                >
                  Academic Information
                </Typography>
                <Stack spacing={3}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      fullWidth
                      label="NMC_number"
                      type={"number"}
                      {...getFieldProps("NMC_number")}
                      error={Boolean(touched.NMC_number && errors.NMC_number)}
                      helperText={touched.NMC_number && errors.NMC_number}
                    />
                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <AttachFileIcon />
                        <input
                          hidden
                          // accept="file"
                          type="file"
                          // type="file"
                          accept=".png, .jpg, .jpeg, .pdf"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "NmcFile",
                              event.target.files[0]
                            );
                          }}
                        />
                      </IconButton>
                      {formik.values.NmcFile
                        ? formik.values.NmcFile.name
                        : null}

                      {/* <ErrorMessage name="NmcFile">
                        {(NmcNumber) => <div>{NmcNumber}</div>}
                      </ErrorMessage> */}
                    </Box>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    // style={{ alignItems: "center" }}
                    marginTop={2}
                  >
                    <TextField
                      fullWidth
                      label="MBBS College Name"
                      {...getFieldProps("MBBS")}
                      error={Boolean(touched.MBBS && errors.MBBS)}
                      helperText={touched.MBBS && errors.MBBS}
                    />
                    <Box>
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="label"
                      >
                        <AttachFileIcon />
                        <input
                          hidden
                          accept=".png, .jpg, .jpeg, .pdf"
                          type="file"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "MBBSFile",
                              event.target.files[0]
                            );
                          }}
                        />
                      </IconButton>
                      {formik.values.MBBSFile
                        ? formik.values.MBBSFile.name
                        : null}

                      {/* <ErrorMessage name="MBBSFile">
                        {(MBBSFile) => <div>{MBBSFile}</div>}
                      </ErrorMessage> */}
                    </Box>
                  </Stack>
                  <Stack>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={MD_MS}
                        onChange={handleChanges}
                      >
                        <FormControlLabel
                          value="MD"
                          control={<Radio />}
                          label="MD"
                        />
                        <FormControlLabel
                          value="MS"
                          control={<Radio />}
                          label="MS"
                        />
                        <FormControlLabel
                          value="None"
                          control={<Radio />}
                          label="None"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  {MD_MS !== "None" ? (
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      marginTop={2}
                    >
                      <TextField
                        fullWidth
                        label="MD/MS College Name"
                        {...getFieldProps("MdMsCollege")}
                        error={Boolean(
                          touched.MdMsCollege && errors.MdMsCollege
                        )}
                        helperText={touched.MdMsCollege && errors.MdMsCollege}
                      />
                      <Box>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <AttachFileIcon />
                          <input
                            hidden
                            accept=".png, .jpg, .jpeg, .pdf"
                            type="file"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "MdMsFile",
                                event.target.files[0]
                              );
                            }}
                          />
                        </IconButton>
                        {formik.values.MdMsFile
                          ? formik.values.MdMsFile.name
                          : null}

                        {/* <ErrorMessage name="MdMsFile">
                          {(MdMsFile) => <div>{MdMsFile}</div>}
                        </ErrorMessage> */}
                      </Box>
                    </Stack>
                  ) : null}

                  <Stack>
                    <FormControl>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={DM_MCH}
                        onChange={handleChangeDmMch}
                      >
                        <FormControlLabel
                          value="DM"
                          control={<Radio />}
                          label="DM"
                        />
                        <FormControlLabel
                          value="MCH"
                          control={<Radio />}
                          label="MCh"
                        />
                        <FormControlLabel
                          value="None"
                          control={<Radio />}
                          label="None"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
                  {DM_MCH !== "None" ? (
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      spacing={2}
                      marginTop={2}
                    >
                      <TextField
                        fullWidth
                        label="DM/MCH College Name"
                        {...getFieldProps("DmMchCollege")}
                        error={Boolean(
                          touched.DmMchCollege && errors.DmMchCollege
                        )}
                        helperText={touched.DmMchCollege && errors.DmMchCollege}
                      />
                      <Box>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                        >
                          <AttachFileIcon />
                          <input
                            hidden
                            accept=".png, .jpg, .jpeg, .pdf"
                            type="file"
                            onChange={(event) => {
                              formik.setFieldValue(
                                "DmMchFile",
                                event.target.files[0]
                              );
                            }}
                          />
                        </IconButton>
                        {formik.values.DmMchFile
                          ? formik.values.DmMchFile.name
                          : null}
                        {/* <ErrorMessage name="DmMchFile">
                          {(DmMchFile) => <div>{DmMchFile}</div>}
                        </ErrorMessage> */}
                      </Box>
                    </Stack>
                  ) : null}
                </Stack>
              </Box>

              <Box
                component={Card}
                variant={"outlined"}
                padding={2}
                bgcolor={"transparent"}
              >
                <Typography
                  variant={"h3"}
                  sx={{ marginBottom: 2 }}
                  align={"center"}
                >
                  Fellowship
                </Typography>
                <TextField
                  fullWidth
                  label="Name of Fellowship 1"
                  // {...getFieldProps("fellowship1")}
                  value={formik.values.fellowship1}
                  onChange={(event) => {
                    formik.setFieldValue("fellowship1", event.target.value);
                    if (formik.values.fellowship1 === "") {
                      formik.setFieldValue("fellow1", false);
                    } else {
                      formik.setFieldValue("fellow1", true);
                    }
                  }}
                  // error={Boolean(touched.fellowship1 && errors.fellowship1)}
                  // helperText={touched.fellowship1 && errors.fellowship1}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <TextField
                    fullWidth
                    label="Institution Name 1"
                    {...getFieldProps("institution1")}
                    error={Boolean(touched.institution1 && errors.institution1)}
                    helperText={touched.institution1 && errors.institution1}
                  />

                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg, .pdf"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "fellowshipFile1",
                            event.target.files[0]
                          );
                        }}
                      />
                    </IconButton>
                    {formik.values.fellowshipFile1
                      ? formik.values.fellowshipFile1.name
                      : null}

                    {/* <ErrorMessage name="fellowshipFile1">
                      {(fellowshipFile1) => <div>{fellowshipFile1}</div>}
                    </ErrorMessage> */}
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  label="Name of Fellowship 2"
                  value={formik.values.fellowship2}
                  onChange={(event) => {
                    formik.setFieldValue("fellowship2", event.target.value);
                    if (formik.values.fellowship2 === "") {
                      formik.setFieldValue("fellow2", false);
                    } else {
                      formik.setFieldValue("fellow2", true);
                    }
                  }}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <TextField
                    fullWidth
                    label="Institution Name 2"
                    {...getFieldProps("institution2")}
                    error={Boolean(touched.institution2 && errors.institution2)}
                    helperText={touched.institution2 && errors.institution2}
                  />

                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg, .pdf"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "fellowshipFile2",
                            event.target.files[0]
                          );
                        }}
                      />
                    </IconButton>
                    {formik.values.fellowshipFile2
                      ? formik.values.fellowshipFile2.name
                      : null}

                    {/* <ErrorMessage name="fellowshipFile2">
                      {(fellowshipFile2) => <div>{fellowshipFile2}</div>}
                    </ErrorMessage> */}
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  label="Name of Fellowship 3"
                  value={formik.values.fellowship3}
                  onChange={(event) => {
                    formik.setFieldValue("fellowship3", event.target.value);
                    if (formik.values.fellowship3 === "") {
                      formik.setFieldValue("fellow3", false);
                    } else {
                      formik.setFieldValue("fellow3", true);
                    }
                  }}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <TextField
                    fullWidth
                    label="Institution Name 3"
                    {...getFieldProps("institution3")}
                    error={Boolean(touched.institution3 && errors.institution3)}
                    helperText={touched.institution3 && errors.institution3}
                  />

                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg, .pdf"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "fellowshipFile3",
                            event.target.files[0]
                          );
                        }}
                      />
                    </IconButton>
                    {formik.values.fellowshipFile3
                      ? formik.values.fellowshipFile3.name
                      : null}

                    {/* <ErrorMessage name="fellowshipFile3">
                      {(fellowshipFile3) => <div>{fellowshipFile3}</div>}
                    </ErrorMessage> */}
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  label="Name of Fellowship 4"
                  value={formik.values.fellowship4}
                  onChange={(event) => {
                    formik.setFieldValue("fellowship4", event.target.value);
                    if (formik.values.fellowship1 === "") {
                      formik.setFieldValue("fellow4", false);
                    } else {
                      formik.setFieldValue("fellow4", true);
                    }
                  }}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <TextField
                    fullWidth
                    label="Institution Name 4"
                    {...getFieldProps("institution4")}
                    error={Boolean(touched.institution4 && errors.institution4)}
                    helperText={touched.institution4 && errors.institution4}
                  />

                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg, .pdf"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "fellowshipFile4",
                            event.target.files[0]
                          );
                        }}
                      />
                    </IconButton>
                    {formik.values.fellowshipFile4
                      ? formik.values.fellowshipFile4.name
                      : null}

                    {/* <ErrorMessage name="fellowshipFile4">
                      {(fellowshipFile4) => <div>{fellowshipFile4}</div>}
                    </ErrorMessage> */}
                  </Box>
                </Stack>
                <TextField
                  fullWidth
                  label="Name of Fellowship 5"
                  value={formik.values.fellowship5}
                  onChange={(event) => {
                    formik.setFieldValue("fellowship5", event.target.value);
                    if (formik.values.fellowship5 === "") {
                      formik.setFieldValue("fellow5", false);
                    } else {
                      formik.setFieldValue("fellow5", true);
                    }
                  }}
                />
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  marginTop={2}
                  marginBottom={2}
                >
                  <TextField
                    fullWidth
                    label="Institution Name 5"
                    {...getFieldProps("institution5")}
                    error={Boolean(touched.institution5 && errors.institution5)}
                    helperText={touched.institution5 && errors.institution5}
                  />

                  <Box>
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <AttachFileIcon />
                      <input
                        hidden
                        accept=".png, .jpg, .jpeg, .pdf"
                        type="file"
                        onChange={(event) => {
                          formik.setFieldValue(
                            "fellowshipFile5",
                            event.target.files[0]
                          );
                        }}
                      />
                    </IconButton>
                    {formik.values.fellowshipFile5
                      ? formik.values.fellowshipFile5.name
                      : null}

                    {/* <ErrorMessage name="fellowshipFile5">
                      {(fellowshipFile5) => <div>{fellowshipFile5}</div>}
                    </ErrorMessage> */}
                  </Box>
                </Stack>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Specialization"
                  {...getFieldProps("specialization")}
                  error={Boolean(
                    touched.specialization && errors.specialization
                  )}
                  helperText={touched.specialization && errors.specialization}
                />
              </Stack>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Type upto 50 unique or hyphenated words seperated by commas"
                label="Specialization Keywords"
                {...getFieldProps("spKey")}
                error={Boolean(touched.spKey && errors.spKey)}
                helperText={touched.spKey && errors.spKey}
              />
              <Typography
                variant={"h3"}
                sx={{ marginBottom: 2 }}
                align={"center"}
              >
                Affiliation
              </Typography>
              <TextField
                fullWidth
                label="Affiliation 1"
                {...getFieldProps("aff1")}
                error={Boolean(touched.aff1 && errors.aff1)}
                helperText={touched.aff1 && errors.aff1}
              />
              <TextField
                fullWidth
                label="Affiliation 2"
                {...getFieldProps("aff2")}
              />
              <TextField
                fullWidth
                label="Affiliation 3"
                {...getFieldProps("aff3")}
              />

              <Box
                component={Card}
                variant={"outlined"}
                padding={2}
                bgcolor={"transparent"}
              >
                <Typography
                  variant={"h3"}
                  sx={{ marginBottom: 2 }}
                  align={"center"}
                >
                  Upload your photo *
                </Typography>
                <Box>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                  >
                    <AttachFileIcon />
                    <input
                      hidden
                      accept=".png, .jpg, .jpeg"
                      type="file"
                      onChange={(event) => {
                        formik.setFieldValue("Photo", event.target.files[0]);
                      }}
                    />
                  </IconButton>
                  {formik.values.Photo ? formik.values.Photo.name : null}
                  {/* <ErrorMessage name="Photo">
                    {(Photo) => <div>{Photo}</div>}
                  </ErrorMessage> */}
                </Box>
              </Box>

              {/* {loading && <Loder />} */}
              <LoadingButton
                size="mideum"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Create
              </LoadingButton>
            </Stack>
            {error && <Error>{error}</Error>}
          </Form>
        </FormikProvider>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Message</DialogTitle>
        {/* {error && <Error>{error}</Error>} */}
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={700}
              gutterBottom
              align="center"
            >
              Thank you. You r application is available to us. After
              verification, we will get back to you.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          {/* <Button onClick={CreatPrescription}>Create Prescription</Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
