import React, { useEffect, useState } from "react";
import { Stack, Alert, AlertTitle } from "@mui/material";

// eslint-disable-next-line
const Error = ({ children }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 10 seconds set the show value to false
      setShow(false);
    }, 10000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);

  // If show is false the component will return null and stop here
  if (!show) {
    return null;
  }
  return (
    <Stack sx={{ width: "100%", marginBottom: 4 }} spacing={2}>
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {children}
        <strong>--Try Again!!</strong>
      </Alert>
    </Stack>
  );
};

export default Error;
