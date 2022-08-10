import React, { useState, useEffect } from 'react';

import { Box, Stack } from '@mui/material';
import { Topbar } from './components/Topbar';
import { SearchBar } from './components/SearchBar';
import { TabBtn } from './components/TabBtn';
import { Footer } from './components/Footer';
import { Logo } from './components/Logo';
import Page from '../../components/Page';
import url from '../../apigetway/mainUrl';

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
    <Page title="Form">
      <Stack direction="column" spacing={2}>
        <Topbar />
        <Logo />
        <Box display={'flex'} justifyContent={'center'} marginTop={4} marginBottom={4}>
          <SearchBar data={allDoctorList} />
        </Box>
        <Box >
          <TabBtn />
        </Box>
        <Stack bgcolor="#F2F2F2" >
          <Footer />
        </Stack>
      </Stack>
    </Page>
  );
};

export default HomePage;
