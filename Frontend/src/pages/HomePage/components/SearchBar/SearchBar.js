import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import { Link } from 'react-router-dom';
import { TextField, Box, Avatar, Typography } from '@mui/material';

const SearchBar = (props) => {
  const { data } = props;
  const [wordEntered, setWordEntered] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const excludeColums = [
    '_id',
    'fee',
    'password',
    'token',
    'dob',
    'gender',
    'address',
    'contactNumber',
    'emailId',
    'role',
    'educationBackground',
    'NMC_number',
    'affiliated_hospital',
    'created_by_admin',
    'profilePhotoLink',
    'coverPhotoLink',
    'videoList',
    'available_dates',
    'doctorId',
  ];

  const handleFilter = (value) => {
    setWordEntered(value);

    filterData(value);
  };

  const filterData = (value) => {
    const lowerCaseValue = value.toLowerCase().trim();
    if (lowerCaseValue === '') {
      setFilteredData([]);
    } else {
      const filterData = data.filter((item) =>
        Object.keys(item).some((key) =>
          excludeColums.includes(key) ? false : item[key].toString().toLowerCase().includes(lowerCaseValue)
        )
      );
      setFilteredData(filterData);
    }
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box
        component={TextField}
        placeholder="Search by doctor name, disease, specialization "
        variant="outlined"
        color="primary"
        fullWidth
        height={1}
        value={wordEntered}
        onChange={(e) => handleFilter(e.target.value)}
        width={{ md: 450 }}
        sx={{
          // maxWidth: 415,
          '& .MuiOutlinedInput-root': { borderRadius: 10 },
        }}
      />
      <Box display={'flex'}>
        {filteredData.length !== 0 && (
          <Box
            sx={{
              marginTop: 1,
              background: 'white',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              padding: 1,
            }}
          >
            {filteredData.slice(0, 15).map((value, i) => (
              <Box
                key={i}
                // width={'100%'}
                // height={'50px'}
                display={'flex'}
                flexDirection={'row'}
                // alignItems={'center'}
                paddingLeft={1}
                component={Link}
                to="/"
                sx={{ textDecoration: 'none', color: 'black' }}
              >
                <Avatar src={value.profilePhotoLink} />
                <Box paddingLeft={'10px'}>
                  <Typography fontWeight={500}>{value.fullName}</Typography>
                  <Box display={'flex'}>
                    {value.tag.slice(0, 3).map((item, i) => (
                      <Box key={i} paddingLeft={'5px'}>
                        <Typography variant="subtitle1">{`#  ${item}  `}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
};
