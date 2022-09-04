import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const DocSignupFileView = ({ files, name, feildName }) => {
  const [fileType, setFileType] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [imageOpen, setImageOpen] = useState(false);

  const [scroll, setScroll] = useState("body");
  const descriptionElementRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleImageClose = () => {
    setImageOpen(false);
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const openPdf = () => {
    setOpen(true);
  };

  const openImage = () => {
    setImageOpen(true);
  };
  useEffect(() => {
    if (files) {
      const file = files.split(".").pop();
      setFileType(file);
    }
    if (open || imageOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [files, open, imageOpen]);

  return (
    <>
      <Grid item xs={12} sm={12} md={8} spacing={2}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
            {feildName}
          </Typography>
          <Typography
            variant={"h5"}
            sx={{ fontWeight: "light", marginLeft: 1 }}
          >
            {name}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={4} spacing={2}>
        {fileType === "pdf" ? (
          <Button onClick={openPdf}>View</Button>
        ) : (
          <Button onClick={openImage}>View</Button>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullScreen
      >
        {/* need to reples /puja with backed data */}
        <div>
          <Document file={files} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <DialogActions>
          <Box display={"flex"}>
            <Box>
              <p>
                Page {pageNumber} of {numPages}
              </p>
              <Pagination
                count={numPages}
                page={pageNumber}
                onChange={handleChange}
              />
            </Box>
            <Box>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={imageOpen}
        onClose={handleImageClose}
        scroll={scroll}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullScreen
      >
        {/* <Box maxWidth={500}> */}
        <Avatar
          alt={name}
          src={files}
          sx={{ width: 500, height: 500, marginBottom: 5 }}
          variant="square"
        />
        {/* </Box> */}

        <DialogActions>
          <Button onClick={handleImageClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DocSignupFileView;
