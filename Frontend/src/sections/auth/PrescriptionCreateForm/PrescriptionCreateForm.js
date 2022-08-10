import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CardActionArea,
  CardContent,
  Card,
  Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CreatePrescription, SendPrescription } from '../../../apigetway/actions/PrescriptionAction';

// component

import Error from '../../../pages/Error';
// import Loder from '../../../pages/Loading';
// ----------------------------------------------------------------------
PrescriptionCreateForm.propTypes = {
  isactive: PropTypes.bool,
  prescriptiondata: PropTypes.object,
  id: PropTypes.any,
};

export default function PrescriptionCreateForm({ id, isactive, prescriptiondata }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  // eslint-disable-next-line
  const [meetingId, setMeetingId] = useState('');

  const dispatch = useDispatch();
  const dispatchSend = useDispatch();

  const prescriptionCreate = useSelector((state) => state.prescriptionCreate);
  const { error, success } = prescriptionCreate;

  const prescriptionSend = useSelector((state) => state.prescriptionSend);
  const { error: sendError } = prescriptionSend;

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const RegisterSchema = Yup.object().shape({
    complaints: Yup.string().min(2, 'Too Short!').required('Enter complaints'),
    observation: Yup.string().min(2, 'Too Short!').required('Enter your name'),
    advise: Yup.string().min(2, 'Too Short!').required('Enter your name'),
    treatment: Yup.string().min(2, 'Too Short!').required('Enter detail prescription'),
  });

  const formik = useFormik({
    initialValues: {
      complaints: `${prescriptiondata.complaints}`,
      observation: `${prescriptiondata.observation}`,
      advise: `${prescriptiondata.advise}`,
      treatment: `${prescriptiondata.treatment}`,
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      setOpen(true);
      setScroll('paper');
    },
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  const CreatPrescription = () => {
    dispatch(
      CreatePrescription(
        id,
        formik.values.complaints,
        formik.values.observation,
        formik.values.advise,
        formik.values.treatment
      )
    );
  };
  const SendPrescriptionData = () => {
    dispatchSend(SendPrescription(id));
  };
  useEffect(() => {
    setMeetingId(id);
    if (success) {
      window.location.reload(false);
      setOpen(false);
    }
  }, [success, id]);

  return (
    <>
      {!isactive ? (
        <Card sx={{ maxWidth: 350 }}>
          <CardActionArea>
            <CardContent>
              <Typography variant="h4" gutterBottom align="center" marginTop={1}>
                Prescription View
              </Typography>
              <Divider sx={{ my: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  ..
                </Typography>
              </Divider>
              <Typography align="center" gutterBottom variant="h5" component="h2">
                complaints
              </Typography>
              <Typography align="center" variant="body2" color="textSecondary" component="p">
                {`${prescriptiondata.complaints}`}
              </Typography>
              <Typography align="center" gutterBottom variant="h5" component="h2">
                observation
              </Typography>
              <Typography align="center" variant="body2" color="textSecondary" component="p">
                {`${prescriptiondata.observation}`}
              </Typography>
              <Typography align="center" gutterBottom variant="h5" component="h2">
                observation
              </Typography>
              <Typography align="center" variant="body2" color="textSecondary" component="p">
                {`${prescriptiondata.advise}`}
              </Typography>
              <Typography align="center" gutterBottom variant="h5" component="h2">
                observation
              </Typography>
              <Typography align="center" variant="body2" color="textSecondary" component="p">
                {`${prescriptiondata.treatment}}`}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center" padding={2}>
            <LoadingButton size="mideum" onClick={SendPrescriptionData} variant="contained">
              Send Prescription
            </LoadingButton>
          </Stack>
        </Card>
      ) : (
        <FormikProvider value={formik}>
          {sendError && <Error>{sendError}</Error>}
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom>
              Create Prescription
            </Typography>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" color="text.primary" fontWeight={700} gutterBottom>
                    Complaints
                  </Typography>
                  <TextField
                    fullWidth
                    disabled={!isactive}
                    label="Complaints"
                    multiline
                    rows={4}
                    {...getFieldProps('complaints')}
                    error={Boolean(touched.complaints && errors.complaints)}
                    helperText={touched.complaints && errors.complaints}
                  />
                </Stack>
                <Stack spacing={2}>
                  <Typography variant="subtitle1" color="text.primary" fontWeight={700} gutterBottom>
                    Observation
                  </Typography>
                  <TextField
                    fullWidth
                    disabled={!isactive}
                    label="Advice"
                    multiline
                    rows={4}
                    {...getFieldProps('advise')}
                    error={Boolean(touched.advise && errors.advise)}
                    helperText={touched.advise && errors.advise}
                  />
                </Stack>
              </Stack>
              <Typography variant="subtitle1" color="text.primary" fontWeight={700} gutterBottom>
                Observation
              </Typography>
              <TextField
                fullWidth
                disabled={!isactive}
                label="Observation"
                multiline
                rows={4}
                {...getFieldProps('observation')}
                error={Boolean(touched.observation && errors.observation)}
                helperText={touched.observation && errors.observation}
              />
              <Grid item xs={12} data-aos="fade-up">
                <Typography variant="subtitle1" color="text.primary" fontWeight={700} gutterBottom>
                  Treatment
                </Typography>
                <TextField
                  placeholder="treatment"
                  variant="outlined"
                  disabled={!isactive}
                  fullWidth
                  multiline
                  rows={4}
                  {...getFieldProps('treatment')}
                  error={Boolean(touched.treatment && errors.treatment)}
                  helperText={touched.treatment && errors.treatment}
                />
              </Grid>

              <LoadingButton size="mideum" type="submit" variant="contained">
                Create
              </LoadingButton>
            </Stack>
          </Form>
        </FormikProvider>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Prescription Preview </DialogTitle>
        {error && <Error>{error}</Error>}
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
              Complaints
            </Typography>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              {formik.values.complaints}
            </Typography>
          </DialogContentText>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
              Advise
            </Typography>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              {formik.values.advise}
            </Typography>
          </DialogContentText>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
              observation
            </Typography>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              {formik.values.observation}
            </Typography>
          </DialogContentText>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            <Typography variant="h5" color="text.primary" fontWeight={700} gutterBottom>
              treatment
            </Typography>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              {formik.values.treatment}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={CreatPrescription}>Create Prescription</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
