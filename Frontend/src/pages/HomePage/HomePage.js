import React, { useState, useEffect } from "react";

import { Box, Stack } from "@mui/material";
import { SearchBar } from "./components/SearchBar";
import { TabBtn } from "./components/TabBtn";
import { Logo } from "./components/Logo";
import Page from "../../components/Page";
import url from "../../apigetway/mainUrl";
import FrontPageLayout from "../../layouts/frontPage";

const HomePage = () => {
  const [allDoctorList, setAllDoctorLis] = useState([]);

  useEffect(() => {
    const getAllDoctorList = async () => {
      await fetch(`${url}/api/v1/public/doctor/view/all`)
        .then((Response) => Response.json())
        .then((receivedData) => setAllDoctorLis(receivedData.data));
    };
    getAllDoctorList();
  }, []);
  return (
    <Page title="Xyba.health">
      <FrontPageLayout />
      <Stack direction="column" spacing={1}>
        {/* <Topbar /> */}
        <Logo />
        <Box
          display={"flex"}
          justifyContent={"center"}
          marginTop={4}
          marginBottom={4}
        >
          <SearchBar data={allDoctorList} />
        </Box>
        <Box>
          <TabBtn />
        </Box>
      </Stack>
    </Page>
  );
};

export default HomePage;
