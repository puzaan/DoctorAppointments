import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import GroupsIcon from '@mui/icons-material/Groups';
import { PrescriptionCreateForm } from '../PrescriptionCreateForm';

MeetingDetailView.propTypes = {
  data: PropTypes.object,
};

export default function MeetingDetailView({ data }) {
  const [patientName, setpatientName] = useState('');
  const [address, setaddress] = useState('');
  const [patientEmail, setpatientEmail] = useState('');
  const [gender, setgender] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [age, setage] = useState('');
  const [dateRequested, setdateRequested] = useState(new Date());
  const [timeRequested, settimeRequested] = useState('');
  const [occupation, setoccupation] = useState('');
  const [message, setmessage] = useState('');
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (data) {
      setpatientName(data.patientDetail.patientName);
      setaddress(data.patientDetail.address);
      setpatientEmail(data.patientDetail.patientEmail);
      setgender(data.patientDetail.gender);
      setphoneNumber(data.patientDetail.phoneNumber);
      setage(data.patientDetail.age);
      setdateRequested(data.patientDetail.dateRequested);
      settimeRequested(data.patientDetail.timeRequested);
      setoccupation(data.patientDetail.occupation);
      setmessage(data.patientDetail.message);
      setUpdated(data.active);
    }
  }, [data]);

  // console.log(data.prescription);
  return (
    <>
      <Card sx={{ maxWidth: 350, marginBottom: 5 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Patient Detail
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Name: ${patientName}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Address: ${address}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Email: ${patientEmail}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Gender: ${gender}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Contact No: ${phoneNumber}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`DOB: ${age}`}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {`Date & Time: ${dateRequested}-${timeRequested}`}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {`Occupation: ${occupation}`}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {`Message: ${message}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Stack direction={{ xs: 'row' }} spacing={2} justifyContent="center" padding={2}>
          <a href={data.meetingLink} rel="noreferrer" target="_blank">
            <Button variant="outlined" startIcon={<GroupsIcon />}>
              Meeting
            </Button>
          </a>
        </Stack>
      </Card>
      <PrescriptionCreateForm id={data.meetingId} isactive={updated} prescriptiondata={data.prescription} />
    </>
  );
}
