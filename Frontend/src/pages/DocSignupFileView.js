import {
  Box,
  Button,
  Dialog,
  DialogActions,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ImageGroup, Image } from "react-fullscreen-image";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

const DocSignupFileView = ({ mbbs, name }) => {
  const [fileType, setFileType] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState("body");
  const descriptionElementRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
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
  useEffect(() => {
    if (mbbs) {
      const file = mbbs.split(".").pop();
      setFileType(file);
      console.log(`fileType: ${fileType}`);
    }
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    console.log(`mbbs:  ${mbbs}`);
  }, [mbbs, open]);

  return (
    <>
      <Grid item xs={12} sm={12} md={8} spacing={2}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant={"h5"} sx={{ fontWeight: "bold" }}>
            MBBS:
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
          <ImageGroup>
            <ul className="images">
              <Image
                src="/xyba_logo.png"
                alt="nature"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </ul>
          </ImageGroup>
        )}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        // aria-labelledby="scroll-dialog-title"
        // aria-describedby="scroll-dialog-description"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // fullScreen
      >
        <div>
          <Document
            file={"/Pujan-Shrestha-Resume.pdf"}
            onLoadSuccess={onDocumentLoadSuccess}
          >
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
    </>
  );
};

export default DocSignupFileView;
